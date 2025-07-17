import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import { AnimatePresence } from 'framer-motion'
import Start from './pages/Start'
import UserLogout from './pages/UserLogout'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div >
      <AnimatePresence mode="wait">

        <Routes>

          <Route path='/' element={<Start />} />

          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/riding' element={<Riding />} />
          
          <Route path='/captain-riding' element={<CaptainRiding />} />
          <Route path='/captain-login' element={<CaptainLogin />} />
          <Route path='/captain-signup' element={<CaptainSignup />} />

          <Route path='/home' element={
            <UserProtectWrapper><Home /></UserProtectWrapper>} />

          <Route path='/user/logout' element={<UserProtectWrapper><UserLogout /></UserProtectWrapper>} />

          <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>} />
          <Route path='/captain/logout' element={<CaptainProtectWrapper><CaptainLogout /></CaptainProtectWrapper>} />
    
         
        </Routes>

      </AnimatePresence>
    </div>
  )
}

export default App