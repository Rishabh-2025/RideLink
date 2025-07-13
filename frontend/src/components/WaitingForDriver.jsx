import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { RiUserLocationFill } from "react-icons/ri";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";

const WaitingForDriver = ({setWaitingForDriver}) => {
    return (
        <div>

            <h5 className='p-3 text-center absolute top-0 w-[93%]  flex items-center justify-center' onClick={() => setWaitingForDriver(false)}>
                <MdKeyboardArrowDown className="text-gray-200 text-3xl scale-x-300" />
            </h5>

            <div className='flex items-center justify-between '>
                <img className='h-12' src="/images/white-car.jpeg" alt="" />

                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Sarthak</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB 12345</h4>
                    <p className='text-sm text-gray-600'>MarutiSuzuki Alto</p>
                </div>
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


            </div>
        </div>
    )
}

export default WaitingForDriver