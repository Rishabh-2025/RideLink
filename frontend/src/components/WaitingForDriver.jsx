import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { RiUserLocationFill } from "react-icons/ri";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import { TbPasswordMobilePhone } from "react-icons/tb";

const WaitingForDriver = ({ setWaitingForDriver, ride }) => {
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
    const vehicleInfo = getVehicleInfo(ride?.vehicleType);
    return (
        <div>

            <h5 className='p-3 text-center absolute top-0 w-[93%]  flex items-center justify-center' onClick={() => setWaitingForDriver(false)}>
                <MdKeyboardArrowDown className="text-gray-200 text-3xl scale-x-300" />
            </h5>

            <div className='flex items-center justify-between '>

                <img className='h-12' src={vehicleInfo.image} alt={ride?.vehicleType} />
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalise'>{ride?.captain?.fullname?.firstname + " " + ride?.captain.fullname.lastname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
                    <p className='text-sm text-gray-600'>{ride?.captain?.vehicle?.vehicleName}</p>
                    <p className='text-sm text-gray-600'>{ride?.captain?.vehicle?.color}</p>
                </div>
            </div>

            <div className=' flex flex-col gap-4 justify-between items-center'>


                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-3 border-b-1'>
                        <FaMapMarkerAlt className='text-gray-700 text-md' />
                        <div className=''>

                            <p className='text-base text-gray-500 -mt-1'>{ride?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-1'>
                        <RiUserLocationFill className='text-gray-700 text-md' />
                        <div className=''>
                            <p className='text-base text-gray-500 -mt-1'>{ride?.destination}</p>
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

                    <div className='flex items-center gap-5 p-3 '>
                       <TbPasswordMobilePhone className='text-gray-700 text-md' />
                        <div className=''>
                            <h3 className='text-lg font-medium'>{ride?.otp}</h3>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default WaitingForDriver