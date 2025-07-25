const blacklistTokenModel = require('../models/blacklistTokenModel');
const captainModel = require('../models/captainModel');
const captainService = require('../services/captainService')
const { validationResult } = require("express-validator");


const registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }


    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        vehicleName: vehicle.vehicleName
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });


}

const loginCaptain = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password')

    if (!captain) {

        return res.status(401).json({ message: "Invalid email and password" })
    };

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email and password" })
    };

    const token = captain.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({ token, captain });

}


const getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain })
}


const logoutCaptain = async (req, res) => {

    
    const token = req.cookies.token || req.headers.authorization.split('')[1];
    
    await blacklistTokenModel.create({ token })
    
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' })
}


module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain,

}