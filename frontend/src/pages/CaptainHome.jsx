import React, { useRef, useState, useEffect, useContext } from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import gsap from 'gsap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null)

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)


  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const payload = {
              userId: captain._id,
              location: {
                type: 'Point',
                coordinates: [position.coords.longitude, position.coords.latitude]
              }
            };
            socket.emit('update-location-captain', payload);
          },
          error => {
            console.error("Geolocation error:", error.message);
          }
        );
      }
    }

    const locationInterval = setInterval(updateLocation, 10000);

    // Don't forget to clear the interval on unmount
    return () => clearInterval(locationInterval);
  }, [])

  socket.on('new-ride', (data) => {
    console.log("=====>", data)
    setRide(data)
    setRidePopUpPanel(true)

  })

  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

      rideId: ride._id,
      captainId: captain._id,


    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('captain-token')}`
      }
    })
    if (response.status === 200) {
      setRidePopUpPanel(false)
      setConfirmRidePopUpPanel(true)
    }

  }

  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])

  return (
    <div className='h-screen'>

      <div className="fixed top-3 left-0 right-0 flex items-center justify-between px-6 py-3 bg-transparent z-50">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img className="h-8 w-auto" src="/images/logo.png" alt="ridelinklogo" />
          <h3 className="font-semibold text-2xl text-black">RideLink</h3>
        </div>

        {/* Logout Button */}
        <Link
          to="/home"
          className="h-10 w-10 bg-white text-black shadow-md flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <IoLogOutOutline className="text-xl" />
        </Link>
      </div>

      <div className='h-3/5'>
        <img src="/images/map-home.gif" className='h-full w-full object-cover' alt="" />
      </div>

      <div className="h-2/5  p-6 mt-">

        <CaptainDetails />

      </div>


      <div ref={ridePopUpPanelRef} className=' fixed z-10 w-full translate-y-full bottom-0 px-3 py-6 pt-14  bg-white'>

        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide} />
      </div>

      <div ref={confirmRidePopUpPanelRef} className='h-screen fixed z-60 w-full translate-y-full bottom-0 px-3 h-screen  py-6 pt-14  bg-white'>

        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>

    </div>
  )
}

export default CaptainHome