// Frontend (React component)
import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import Profile from './Profile';

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        // If logout is successful, redirect the user to the login page or any other desired page
        navigate('/login');
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className='w-full h-[10vh] bg-zinc-200  flex justify-between p-10 items-center '>
      <Link to={'/'} className='font-semibold font-mono text-2xl'>Workout</Link>
      <div className='flex gap-4 items-center'>
        <Link to='/signup' className='text-xl' ><FaUser /></Link>
        <Link to='/Addworkout' className='text-2xl font-bold' ><IoMdAddCircle /></Link>
        <button onClick={handleLogout} className='text-2xl font-light' >Logout</button>
        {/* <a href="/api/user/logout" >Logout</a> */}
        <ImProfile className='text-xl cursor-pointer' onClick={() => setIsProfileOpen(!isProfileOpen)} />
      </div>
      {/* Profile Popup */}
      {isProfileOpen && (
        <div className="absolute top-20 right-4 bg-white p-2 rounded-lg shadow-md">
          <Profile />
        </div>
      )}
    </div>
  );
}

export default Navbar;

