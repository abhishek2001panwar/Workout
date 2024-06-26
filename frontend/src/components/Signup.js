// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const clearUserData = () => {
    // Clear user-related data from local storage
    localStorage.removeItem("token");
    // Add any other user-related data to clear here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        clearUserData(); // Call the function to clear user data
        navigate('/'); // Navigate to the home page after successful signup
      } else {
        setError(data.message || "Signup failed"); // Assuming your API returns an error message
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during signup");
    }
  };

  return (
    <div className="flex h-screen bg-zinc-200 items-center justify-center">
      <div className="bg-white px-10 md:px-32 py-10 rounded shadow-md w-100">
        <h2 className="text-2xl mb-4 font-semibold font-mono text-center">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input mt-1 px-5 py-2 border-2 block w-full rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input mt-1 px-5 py-2 border-2 block w-full rounded"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-20 mt-5 rounded hover:bg-white hover:text-teal-700"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
