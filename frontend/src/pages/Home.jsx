import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -180 }}
            transition={{
                duration: 2.5,
                ease: [0.42, 0, 0.58, 1],
            }}
        >
            <div className='bg-cover bg-[url(/images/bg1-location.jpg)] h-screen w-full flex justify-between flex-col'>
                <div className='flex gap-2 mt-5 items-center pl-5 h-10 '>
                    <img className='h-6' src="/images/logo.png" alt="ridelinklogo" />
                    <h3 className='font-semibold  text-2xl '>RideLink</h3>
                </div>
                <div className='bg-white py-4 px-5'>
                    <h2 className='text-2xl font-bold'>Get Started With RideLink</h2>
                    <Link to={'/login'} className='flex justify-center items-center w-full bg-black text-white py-3 rounded-md mt-4 hover:text-#007dfe'>Continue</Link>
                </div>

            </div>

        </motion.div>

    )
}

export default Home