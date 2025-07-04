import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
import { motion } from 'framer-motion'

const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

        const navigate = useNavigate()
        const {user,setUser} = useContext(UserDataContext)



    const submitHandler = async(e) => {
        e.preventDefault();

       const userData = {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login `,userData)

        if(response.status === 200){
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token',data.token)
            navigate('/home')
        }
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

                    <h3 className='text-xl mb-2 font-semibold'>What's your email</h3>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='email@example.com'
                        className='bg-[#eeeeee] rounded px-4 py-1 mb-6 border w-full text-lg placeholder:text-base'
                    />

                    <h3 className='text-xl mb-2 font-semibold'> Enter Password </h3>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='password'
                        className='bg-[#eeeeee] rounded px-4 py-1 mb-6 border w-full text-lg placeholder:text-base'
                    />

                    <button placeholder='password'
                        className='bg-[#111] text-white rounded px-4 py-1  border w-full text-lg placeholder:text-base mb-5' >Login</button>

                </form>

                <p className='text-center text-md'>
                    New here?
                    <Link to={'/signup'} className='text-blue-500'> Create New Account</Link>
                </p>
            </div>

            <div>
                <Link to={'/captain-login'} placeholder='password'
                    className=' bg-[#007dfe] flex items-center justify-center text-white rounded px-4 py-1  border w-full text-lg placeholder:text-base' >Sign in as Captain</Link>
            </div>

        </motion.div>
    )
}

export default UserLogin