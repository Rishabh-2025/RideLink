import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { HiDocumentCurrencyRupee } from 'react-icons/hi2'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiUserLocationFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const FinishRide = ({ setFinishRidePanel }) => {
    return (

        <div >

            <h5 className='p-3 text-center absolute top-0 w-[93%]  flex items-center justify-center' onClick={() => { setFinishRidePanel(false) }}>
                <MdKeyboardArrowDown className="text-gray-200 text-3xl scale-x-300" />
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

            <div className='flex items-center justify-between bg-blue-200 text-gray-900 rounded-xl p-4'>

                <div className="flex items-center  gap-3 ">
                    <img src="" alt="User Avatar" className="h-12 w-12 rounded-full object-cover bg-gray-200" />
                    <h4 className="text-lg font-medium">Test1</h4>
                </div>
                <h5 className='text-lg font-semibold '> 2.2 km</h5>

            </div>

            <div className=' flex flex-col gap-4 justify-between items-center'>


                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-3 border-b-1'>
                        <FaMapMarkerAlt className='text-gray-700 text-md' />
                        <div className=''>
                            <h3 className='text-lg font-medium'>546/11-4</h3>
                            <p className='text-base text-gray-500 -mt-1'>Kanakariya talab, Bhopal </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-1'>
                        <RiUserLocationFill className='text-gray-700 text-md' />
                        <div className=''>
                            <h3 className='text-lg font-medium'>546/11-4</h3>
                            <p className='text-base text-gray-500 -mt-1'>Kanakariya talab, Bhopal </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 '>
                        <HiDocumentCurrencyRupee className='text-gray-700 text-md' />
                        <div className=''>
                            <h3 className='text-lg font-medium'>&#8377;193.6</h3>
                            <p className='text-base text-gray-500 -mt-1'>Cash </p>
                        </div>
                    </div>
                </div>




                <div className='flex  flex-col w-full items-center gap-3'>

                    <Link to={"/captain-home"} className=' w-full bg-[#007dfe] text-center  text-white font-semibold p-2 rounded-lg'>Ride Completed</Link>

                    <p className='text-gray-600  text-xs'>Click on the finish ride if you received the payment</p>
                </div>



            </div>

        </div>
    )
}

export default FinishRide