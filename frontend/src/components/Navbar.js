import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import Profile from './Profile';

function Navbar() {
  const [workout, setWorkout] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch("/api/workout");
        const json = await response.json();

        if (response.ok) {
          setWorkout(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchWorkout();
  }, []);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen); // Toggle profile popup visibility
  };
  function handleLogout() {
    fetch("/api/user/logout", {
      method: "GET", // Assuming the logout endpoint uses POST method
      credentials: "include", // Include cookies in the request
    })
      .then((response) => {
        if (response.ok) {
          // If logout is successful, redirect the user to the login page or any other desired page
          window.location.href = "/login";
        } else {
          // Handle logout failure
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }
  
  return (
    <div className='w-full h-[10vh] bg-zinc-200  flex justify-between p-10 items-center'>
      <Link to={'/'} className='font-semibold font-mono text-2xl'>Workout</Link>
      <div className='flex gap-4 items-center'>
        <Link to='/signup' className='text-xl' ><FaUser /></Link>
        <Link to='/Addworkout' className='text-2xl font-bold' ><IoMdAddCircle /></Link>
        <Link to='#' onClick={handleLogout} className='text-2xl font-light' ></Link>
        <ImProfile className='text-xl cursor-pointer' onClick={handleProfileClick} />
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
