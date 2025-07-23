import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { RiUserLocationFill } from "react-icons/ri";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
const LookingForDriver = ({ createRide, pickup, destination, fare, vehicleType, setVehicleFound }) => {

    const getVehicleInfo = (type) => {
        switch (type) {
            case 'auto':
                return { image: '/images/auto.jpeg', price: fare.auto?.fare };
            case 'car':
                return { image: '/images/white-car.jpeg', price: fare.car?.fare };
            case 'moto':
                return { image: '/images/bike.jpeg', price: fare.moto?.fare };
            default:
                return { image: '/images/white-car.jpeg', price: 0 };
        }
    };
    const vehicleInfo = getVehicleInfo(vehicleType);

    return (
        <div>

            <h5 className='p-3 text-center absolute top-0 w-[93%]  flex items-center justify-center' onClick={() => setVehicleFound(false)}>
                <MdKeyboardArrowDown className="text-gray-200 text-3xl scale-x-300" />
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a driver</h3>

            <div className=' flex flex-col gap-4 justify-between items-center'>
                <img className='h-20' src={vehicleInfo.image} alt={vehicleType} />

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-1'>
                        <FaMapMarkerAlt className='text-gray-700 text-md' />
                        <div className=''>

                            <p className='text-base text-gray-500 -mt-1'>{pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-1'>
                        <RiUserLocationFill className='text-gray-700 text-md' />
                        <div className=''>

                            <p className='text-base text-gray-500 -mt-1'>{destination} </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 '>
                        <HiDocumentCurrencyRupee className='text-gray-700 text-md' />
                        <div className=''>
                            <h3 className='text-lg font-medium'>&#8377;{' '}{fare[vehicleType]?.fare}</h3>
                            <p className='text-base text-gray-500 -mt-1'>Distance:{' '}{fare[vehicleType]?.distance} KM </p>
                            <p className='text-base text-gray-500 -mt-1'>Time:{' '}{fare[vehicleType]?.time}min</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default LookingForDriver