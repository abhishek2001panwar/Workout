import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = '/'; // Redirect to dashboard after successful login
      } else {
        setError(data.message || "Login failed"); // Assuming your API returns an error message
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="flex h-screen bg-zinc-200 items-center justify-center">
      <div className="bg-white p-5 md:p-10 rounded shadow-md w-100">
        <h2 className="text-2xl mb-4 font-semibold text-center font-mono ">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input mt-1 px-10 py-2 border-2 block w-full rounded"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input mt-1 px-5 py-2 border-2 block w-full rounded"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-20 mt-5 rounded hover:bg-white hover:text-teal-700"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?
          <Link to="/signup" className="text-teal-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
