import React, { useRef, useState ,useContext, useEffect} from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios';
import { MdKeyboardArrowDown } from 'react-icons/md';
import LocationSearchPanel from '../components/LocationSearchPanel';
import { FaUserAlt } from "react-icons/fa";
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [showButton, setShowButton] = useState(false);
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)


    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])

    socket.on('ride-confirmed', ride => {


        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } }) 
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault()
    }


    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)
        setShowButton(false)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        setFare(response.data)


    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data);

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

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -180 }}
            transition={{
                duration: 1.5,
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

                        <h5 ref={panelCloseRef} onClick={() => { setPanelOpen(false), setShowButton(false) }} className='absolute opacity-0 top-6 right-6 text-3xl'>

                            <MdKeyboardArrowDown className="text-gray-700" />
                        </h5>

                        <h4 className='text-2xl font-semibold'>Find a trip</h4>

                        <form onSubmit={(e) => submitHandler(e)}>
                            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>


                            <input type="text" placeholder='Add a pick-up location'
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('pickup')
                                    setShowButton(true)
                                }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className='bg-[#eee] px-12 py-2 text-base rounded-xl w-full mt-5' />

                            <input type="text" placeholder='Enter your destination'
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('destination')
                                    setShowButton(true)
                                }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className='bg-[#eee] px-12 py-2 text-base rounded-xl w-full mt-3' />
                        </form>
                        {(showButton && (pickup !== '' && destination !== "")) && (<button
                            onClick={findTrip}
                            className='bg-[#007dfe] text-white px-4 py-2 mt-2 rounded-lg  w-full'>
                            Find Trip
                        </button>)}
                    </div>

                    <div ref={panelRef} className='bg-white '>
                        <LocationSearchPanel
                            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                            setPanelOpen={setPanelOpen}
                            setVehiclePanel={setVehiclePanel}
                            setPickup={setPickup}
                            setDestination={setDestination}
                            activeField={activeField}
                        />
                    </div>

                </div>

                <div ref={vehiclePanelRef} className=' fixed z-10 w-full -bottom-0 px-3 py-10 pt-14 translate-y-full bg-white'>

                    <VehiclePanel selectVehicle={setVehicleType}
                        fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />

                </div>

                <div ref={confirmRidePanelRef} className=' fixed z-10 w-full bottom-0 px-3 py-6 pt-14 translate-y-full bg-white'>

                    <ConfirmRide
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />

                </div>

                <div ref={vehicleFoundRef} className=' fixed z-10 w-full bottom-0 px-3 py-6 pt-14 translate-y-full bg-white'>

                    <LookingForDriver
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setVehicleFound={setVehicleFound} />
                </div>

                <div ref={waitingForDriverRef} className=' fixed z-10 w-full bottom-0 px-3 py-6 pt-14 translate-y-full bg-white'>

                    <WaitingForDriver  
                    ride={ride}
                    setWaitingForDriver={setWaitingForDriver}
                     />
                </div>

            </div>
        </motion.div>
    )
}

export default Home
