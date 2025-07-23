import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaUserAlt } from "react-icons/fa";
const VehiclePanel = ({selectVehicle, fare, setConfirmRidePanel,setVehiclePanel}) => {
    return (
        <div>
            <h5 onClick={() => setVehiclePanel(false)} className='p-3 text-center absolute top-0 w-[93%]  flex items-center justify-center'>
                <MdKeyboardArrowDown className="text-gray-200 text-3xl scale-x-300" />
            </h5>


            <h3 className='text-2xl font-semibold mb-5'>Choose Vehicle</h3>

            <div onClick={()=>{setConfirmRidePanel(true), selectVehicle('car')}} className='flex border-2 mb-3 active:border-black  rounded-xl  w-full items-center justify-between p-3'>
                <img className='h-14' src="/images/white-car.jpeg" alt="" />

                <div className='w-1/2 ml-2 '>
                    <h4 className='font-medium text-lg flex items-center gap-2'>Ride <span className='flex items-center gap-2' ><FaUserAlt className='text-xs' />4 </span></h4>
                    <h5 className='font-medium text-sm'>{fare?.car?.time} min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>

                </div>
                <h2 className='text-xl font-semibold'>&#8377;{fare?.car?.fare}</h2>
            </div>

            <div  onClick={()=>{setConfirmRidePanel(true), selectVehicle('moto')}}  className='flex border-2 mb-3 active:border-black  rounded-xl  w-full items-center justify-between p-3'>
                <img className='h-14' src="/images/bike.jpeg" alt="" />

                <div className='w-1/2 ml-2 '>
                    <h4 className='font-medium text-lg flex items-center gap-2'>Moto <span className='flex items-center gap-2' ><FaUserAlt className='text-xs' />1 </span></h4>
                    <h5 className='font-medium text-sm'>{fare?.moto?.time} min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, motocycle rides</p>

                </div>
                <h2 className='text-xl font-semibold'>&#8377;{fare?.moto?.fare}</h2>
            </div>

            <div  onClick={()=>{setConfirmRidePanel(true),selectVehicle('auto')}}  className='flex border-2 mb-3 active:border-black  rounded-xl  w-full items-center justify-between p-3'>
                <img className='h-14' src="/images/auto.jpeg" alt="" />

                <div className='w-1/2 ml-2 '>
                    <h4 className='font-medium text-lg flex items-center gap-2'>AutoRide <span className='flex items-center gap-2' ><FaUserAlt className='text-xs' />3 </span></h4>
                    <h5 className='font-medium text-sm'>{fare?.auto?.time} min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>

                </div>
                <h2 className='text-xl font-semibold'>&#8377;{fare?.auto?.fare}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel