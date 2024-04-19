import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/user/signup", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Handle error
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='flex justify-center'>
      <div className="bg-teal-500 text-white p-8 rounded-lg shadow-md">
        {user ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                {/* Assuming user profile picture is available in user data */}
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <div>
                <button className="text-teal-500 bg-white hover:bg-teal-100 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2.5">Follow</button>
              </div>
            </div>
            <p className="text-lg font-semibold leading-none">{user.name}</p>
            <p className="mb-2 text-sm font-normal">{user.email}</p>
            <p className="mb-4 text-sm">{user.bio}</p>
            <div className="flex text-sm">
              <div className="me-4">
                <a href="#" className="text-teal-200 hover:text-white">
                  <span className="font-semibold">{user.following}</span>
                  <span className="block">Following</span>
                </a>
              </div>
              <div>
                <a href="#" className="text-teal-200 hover:text-white">
                  <span className="font-semibold">{user.followers}</span>
                  <span className="block">Followers</span>
                </a>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
