import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'


const UserSignup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate()
    const {user,setUser} = useContext(UserDataContext)
    
    
    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser= {
            fullname:{
                firstname:firstName,
                lastname:lastName
            },
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register `,newUser)

        if(response.status === 201){
            const data = response.data;
            setUser(data.user);
              localStorage.setItem('token',data.token)
            navigate('/home')
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
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

                <form className=' mt-12' onSubmit={(e) => submitHandler(e)}>

                    <h3 className='text-lg mb-2 font-semibold'>What's your name</h3>

                    <div className='flex gap-4 mb-6'>
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



                    <h3 className='text-lg mb-2 font-semibold'>What's your email</h3>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='email@example.com'
                        className='bg-[#eeeeee] rounded px-4 py-1 mb-6 border w-full text-lg placeholder:text-base'
                    />

                    <h3 className='text-lg mb-2 font-semibold'> Enter Password </h3>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='password'
                        className='bg-[#eeeeee] rounded px-4 py-1 mb-6 border w-full text-lg placeholder:text-base'
                    />

                    <button placeholder='password'
                        className='bg-[#111] text-white rounded px-4 py-1  border w-full text-lg placeholder:text-base mb-5' >Create Account</button>

                </form>

                <p className='text-center text-md'>
                    Already have a account?
                    <Link to={'/login'} className='text-blue-500'> Login here</Link>
                </p>
            </div>

            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                    Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>

        </motion.div>
    )
}

export default UserSignup