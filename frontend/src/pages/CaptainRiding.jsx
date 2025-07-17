import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { IoLogOutOutline } from 'react-icons/io5'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false);

    const finishRidePanelRef = useRef();

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen'>

            <div className="fixed top-3 left-0 right-0 flex items-center justify-between px-6 py-3 bg-transparent z-50">

                <div className="flex items-center gap-2">
                    <img className="h-8 w-auto" src="/images/logo.png" alt="ridelinklogo" />
                    <h3 className="font-semibold text-2xl text-black">RideLink</h3>
                </div>


                <Link
                    to="/captain-home"
                    className="h-10 w-10 bg-white text-black shadow-md flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                    <IoLogOutOutline className="text-xl" />
                </Link>
            </div>

            <div className='h-4/5'>
                <img src="/images/map-home.gif" className='h-full w-full object-cover' alt="" />
            </div>

            <div className="h-1/5  p-8  bg-blue-200 flex items-center justify-between relative" 
            onClick={()=>{setFinishRidePanel(true)}} >

                <h5 className='-ml-10 text-center absolute top-0 w-full  flex items-center justify-center' >
                    <MdKeyboardArrowUp className="text-gray-500 text-3xl scale-x-300" />
                </h5>
                <h4 className='text-xl text-gray-800 font-semibold '>4 km away</h4>
                <button className=' w-44 bg-[#007dfe] font-semibold p-2 rounded-lg text-white'>Complete Ride</button>
            </div>

            <div ref={finishRidePanelRef} className=' fixed z-10 w-full translate-y-full bottom-0 px-3 py-6 pt-14  bg-white'>

                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding