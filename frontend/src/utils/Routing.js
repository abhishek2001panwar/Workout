import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Workoutdetail from '../components/Workoutdetail'
import Profile from '../components/Profile'

function Routing() {
  return (
    <>
    <Routes>
      
        <Route path='/' element={<Home/>} />
       
        <Route path='/profile' element={<Profile/>} />

        <Route path='/signup' element={<Signup/>} />
        <Route path='/Addworkout' element={<Workoutdetail/>} />
        <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default Routing