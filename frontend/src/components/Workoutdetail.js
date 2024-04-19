import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Workoutdetail() {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [workout, setWorkout] = useState([]);

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

  const notify = () => toast("Workout Added");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const workoutData = { title, load, reps };

      const response = await fetch("/api/workout", {
        method: "POST",
        body: JSON.stringify(workoutData),
        headers: {
          "Content-type": "application/json",
        },
      });

      const newWorkout = await response.json();

      if (response.ok) {
        setWorkout([...workout, newWorkout]); // Add the new workout to the existing list
        setTitle("");
        setLoad("");
        setReps("");
        notify();
      } else {
        console.error("Failed to add workout:", newWorkout.error);
        // Notify user of the error
        toast.error("Failed to add workout. Please try again.");
      }
    } catch (error) {
      console.error("Failed to add workout:", error.message);
      // Notify user of the error
      toast.error("Failed to add workout. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white shadow-md rounded absolute top-[30%] px-32 pt-6 pb-10 mb-4" onSubmit={handleSubmit}>
        <div className="">
        <h1 className="text-2xl mb-4 font-mono text-center">Add Workout</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="load">
            Load:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="load"
            type="number"
            placeholder="Enter load"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reps">
            Reps:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reps"
            type="number"
            placeholder="Enter reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-teal-500 hover:bg-white hover:text-teal-700 text-white py-2 px-20 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default Workoutdetail;
