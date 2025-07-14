import React from 'react'
import {Link} from'react-router-dom'
import { HiDocumentCurrencyRupee } from 'react-icons/hi2'
import { RiHome9Line, RiUserLocationFill } from 'react-icons/ri'

const Riding = () => {
  return (
    <div className='h-screen'>

        <Link to={"/home"} className='fixed right-2 top-2  h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <RiHome9Line className='text-lg font-medium'  />
        </Link>

        <div className = 'h-1/2'>
            <img src="/images/map-home.gif" className='h-full w-full object-cover' alt="" />
        </div>

        <div className='h-1/2 p-4'>
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
            <button className='w-full bg-[#007dfe] mt-5 text-white font-semibold p-2 rounded-lg' >Make a Payment</button>
        </div>

    </div>
  )
}

export default Riding