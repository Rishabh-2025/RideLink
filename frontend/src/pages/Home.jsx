import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MdKeyboardArrowDown } from 'react-icons/md';
import LocationSearchPanel from '../components/LocationSearchPanel';
import { FaUserAlt } from "react-icons/fa";
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';

const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)


    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)

    const submitHandler = async (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                opacity: 1,
                padding: 16
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                opacity: 0,
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -180 }}
            transition={{
                duration: 2.5,
                ease: [0.42, 0, 0.58, 1],
            }}
            className='relative overflow-hidden'
        >
            <div className='bg-cover bg-[url(/images/map-home.gif)] h-screen w-full flex justify-between flex-col'>

                <div className='flex gap-2 mt-5 items-center pl-5 h-10 '>
                    <img className='h-6' src="/images/logo.png" alt="ridelinklogo" />
                    <h3 className='font-semibold  text-2xl '>RideLink</h3>
                </div>

                <div className='  flex flex-col justify-end absolute top-0 w-full h-screen  '>

                    <div className='h-[30%] bg-white p-5 relative '>

                        <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 top-6 right-6 text-3xl'>

                            <MdKeyboardArrowDown className="text-gray-700" />
                        </h5>

                        <h4 className='text-2xl font-semibold'>Find a trip</h4>

                        <form onSubmit={(e) => submitHandler(e)}>
                            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>


                            <input type="text" placeholder='Add a pick-up location'
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                onClick={() => setPanelOpen(true)}
                                className='bg-[#eee] px-12 py-2 text-base rounded-xl w-full mt-5' />

                            <input type="text" placeholder='Enter your destination'

                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onClick={() => setPanelOpen(true)}
                                className='bg-[#eee] px-12 py-2 text-base rounded-xl w-full mt-3' />
                        </form>
                    </div>

                    <div ref={panelRef} className='bg-white h-0'>
                        <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
                    </div>

                </div>

                <div ref={vehiclePanelRef} className=' fixed z-10 w-full bottom-0 px-3 py-10 pt-14 translate-y-full bg-white'>

                    <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />

                </div>

                <div ref={confirmRidePanelRef} className=' fixed z-10 w-full bottom-0 px-3 py-6 pt-14 translate-y-full bg-white'>

                    <ConfirmRide />

                </div>

            </div>
        </motion.div>
    )
}

export default Home
