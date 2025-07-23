import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { RiUserLocationFill } from "react-icons/ri";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { UserDataContext } from '../context/UserContext';

const RidePopUp = ({ ride, setRidePopUpPanel, setConfirmRidePopUpPanel, confirmRide }) => {

    return (
        <div>

            <h5 className='p-3 text-center absolute top-0 w-[93%]  flex items-center justify-center' onClick={() => setRidePopUpPanel(false)}>
                <MdKeyboardArrowDown className="text-gray-200 text-3xl scale-x-300" />
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>

            <div className='flex items-center justify-between bg-blue-200 text-gray-900 rounded-xl p-4'>

                <div className="flex items-center  gap-3 ">
                    <img src={ride?.user?.image ? ride?.user?.image : "/images/user.png"} alt="User Avatar" className="h-12 w-12 rounded-full object-cover bg-gray-200" />
                    <h4 className="text-lg font-medium capitalise">{ride?.user?.fullname.firstname + " " + ride?.user?.fullname.lastname}</h4>
                </div>
                <h5 className='text-lg font-semibold '> {ride?.distance} {" "}km</h5>

            </div>

            <div className=' flex flex-col gap-4 justify-between items-center'>


                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-3 border-b-1'>
                        <FaMapMarkerAlt className='text-gray-700 text-md' />

                        <p className='text-base text-gray-500 -mt-1'>{ride?.pickup}</p>
                        <div className=''>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-1'>
                        <RiUserLocationFill className='text-gray-700 text-md' />
                        <div className=''>

                            <p className='text-base text-gray-500 -mt-1'>{ride?.destination} </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 '>
                        <HiDocumentCurrencyRupee className='text-gray-700 text-md' />
                        <div className=''>
                            <h3 className='text-lg font-medium'>&#8377;{' '}{ride?.fare}</h3>
                            <p className='text-base text-gray-500 -mt-1'>Distance:{' '}{ride?.distance} KM </p>
                            <p className='text-base text-gray-500 -mt-1'>Time:{' '}{ride?.time}min</p>
                        </div>
                    </div>
                </div>

                <div className='flex w-full items-center mt-2 gap-3'>

                    <button onClick={() => { setRidePopUpPanel(false) }} className='w-1/2 bg-gray-500  text-white font-semibold p-2 rounded-lg'>Ignore</button>

                    <button onClick={() => {
                        setConfirmRidePopUpPanel(true),confirmRide()
                    }} className='w-1/2 bg-[#007dfe]  text-white font-semibold p-2 rounded-lg'>Accept</button>


                </div>


            </div>

        </div>
    )
}

export default RidePopUp