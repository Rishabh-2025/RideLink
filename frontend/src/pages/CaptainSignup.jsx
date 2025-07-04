import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
const CaptainSignup = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const { captain, setCaptain } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault()
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

        if (response.status === 201) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('captain-token', data.token)
            navigate('/captain-home')
        }

        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')

    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1]
            }}

            className='p-7 h-screen flex flex-col justify-between'
        >

            <div>
                <div className='flex gap-2  items-center  h-10 '>
                    <img className='h-6' src="/images/logo.png" alt="ridelinklogo" />
                    <h3 className='font-semibold  text-2xl '>RideLink</h3>
                </div>

                <form className=' mt-6' onSubmit={(e) => submitHandler(e)}>

                    <h3 className='text-lg mb-2 font-semibold'>What's our Captain name</h3>

                    <div className='flex gap-4 mb-4'>
                        <input
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            placeholder='First Name '
                            className='bg-[#eeeeee] rounded px-4 py-1  border w-1/2 text-lg placeholder:text-base'
                        />
                        <input
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Last Name '
                            className='bg-[#eeeeee] rounded px-4 py-1  border w-1/2 text-lg placeholder:text-base'
                        />
                    </div>



                    <h3 className='text-lg mb-2 font-semibold'>What's our Captain email</h3>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='email@example.com'
                        className='bg-[#eeeeee] rounded px-4 py-1 mb-4 border w-full text-lg placeholder:text-base'
                    />

                    <h3 className='text-lg mb-2 font-semibold'> Enter Password </h3>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='password'
                        className='bg-[#eeeeee] rounded px-4 py-1 mb-4 border w-full text-lg placeholder:text-base'
                    /><h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-3 mb-6'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-md placeholder:text-base'
                            type="text"
                            placeholder='Vehicle Color'
                            value={vehicleColor}
                            onChange={(e) => {
                                setVehicleColor(e.target.value)
                            }}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-md placeholder:text-base'
                            type="text"
                            placeholder='Vehicle Plate'
                            value={vehiclePlate}
                            onChange={(e) => {
                                setVehiclePlate(e.target.value)
                            }}
                        />
                    </div>
                    <div className='flex gap-3 mb-7'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-md placeholder:text-base'
                            type="number"
                            placeholder='Vehicle Capacity'
                            value={vehicleCapacity}
                            onChange={(e) => {
                                setVehicleCapacity(e.target.value)
                            }}
                        />
                        <select
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-md placeholder:text-base'
                            value={vehicleType}
                            onChange={(e) => {
                                setVehicleType(e.target.value)
                            }}
                        >
                            <option value="" disabled className='text-base'>Vehicle Type</option>
                            <option value="car" className='text-base'>Car</option>
                            <option value="auto" className='text-base'>Auto</option>
                            <option value="moto" className='text-base' >Moto</option>
                        </select>
                    </div>

                    <button placeholder='password'
                        className='bg-[#111] text-white rounded px-4 py-1  border w-full text-lg placeholder:text-base mb-1' >Create Account</button>

                </form>

                <p className='text-center text-md mb-6'>
                    Already have a account?
                    <Link to={'/captain-login'} className='text-blue-500'> Login here</Link>
                </p>
            </div>

            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                    Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>

        </motion.div>
    )
}

export default CaptainSignup