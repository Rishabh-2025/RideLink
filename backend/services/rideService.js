const rideModel = require('../models/rideModel');
const mapService = require('./mapsService');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const distanceKm = distanceTime.distance.value / 1000; // in kilometers
  const timeMin = distanceTime.duration.value / 60; // in minutes

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5
  };

  const fareData = {
    auto: {
      fare: Math.round(baseFare.auto + distanceKm * perKmRate.auto + timeMin * perMinuteRate.auto),
      distance: Number(distanceKm.toFixed(2)),
      time: Math.round(timeMin)
    },
    car: {
      fare: Math.round(baseFare.car + distanceKm * perKmRate.car + timeMin * perMinuteRate.car),
      distance: Number(distanceKm.toFixed(2)),
      time: Math.round(timeMin)
    },
    moto: {
      fare: Math.round(baseFare.moto + distanceKm * perKmRate.moto + timeMin * perMinuteRate.moto),
      distance: Number(distanceKm.toFixed(2)),
      time: Math.round(timeMin)
    }
  };

  return fareData;
}





function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


const createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

     const allFares = await getFare(pickup, destination);
    const selectedFare = allFares[vehicleType];



    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6), 
        fare: selectedFare.fare,          
        distance: (selectedFare.distance)*1000,  
        time: (selectedFare.time)*60, 
        vehicleType: vehicleType
    })

    return ride;
}

const confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

const startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

const endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}


module.exports = {
    getFare,
    getOtp,
    createRide,
    confirmRide,
    startRide,
    endRide
}