import React, { useRef, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { RiUserLocationFill } from "react-icons/ri";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
const ConfirmRidePopUp = ({ setConfirmRidePopUpPanel, setRidePopUpPanel }) => {

    const [otp, setOtp] = useState(["", "", "", ""]);
    const otpRefs = useRef([]);

    const handleOtpChange = (e, index) => {
        const value = e.target.value.replace(/\D/, "");
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);


        if (value && index < otp.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handleOtpBackspace = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        console.log("Submitted OTP:", enteredOtp);

    };

    return (

        <div >

            <h5 className='p-3 text-center absolute top-0 w-[93%]  flex items-center justify-center' onClick={() => { setConfirmRidePopUpPanel(false) }}>
                <MdKeyboardArrowDown className="text-gray-200 text-3xl scale-x-300" />
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>

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



                <div className='mt-1 w-full'>
                    <form onSubmit={submitHandler}>
                        <h3 className='text-2xl font-semibold mb-5' >Enter OTP</h3>
                        <div className="flex justify-evenly gap-2 mb-10">
                            {Array(6)
                                .fill(0)
                                .map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleOtpBackspace(e, index)}
                                    ref={(el) => (otpRefs.current[index] = el)}
                                    />
                                ))}
                        </div>

                        <div className='flex  w-full items-center mt-2 gap-3'>

                            <button onClick={() => {
                                setConfirmRidePopUpPanel(false),
                                    setRidePopUpPanel(false)
                            }} className='w-1/2 bg-red-600 font-semibold p-2 rounded-lg text-white'>Cancel</button>

                            <Link to={"/captain-riding"} className='w-1/2 bg-[#007dfe] text-center  text-white font-semibold p-2 rounded-lg'>Confirm</Link>


                        </div>

                    </form>
                </div>


            </div>

        </div>
    )
}

export default ConfirmRidePopUp