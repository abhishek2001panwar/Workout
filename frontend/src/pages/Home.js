import React, { useEffect, useState } from "react";
import WorkoutCom from "../components/WorkoutCom";

function Home() {
  const [workout, setWorkout] = useState([]);

  // Load workout data from local storage on component mount
  useEffect(() => {
    const storedWorkout = JSON.parse(localStorage.getItem("workout")) || [];
    setWorkout(storedWorkout);
  }, []);

  // Update local storage whenever workout state changes
  useEffect(() => {
    localStorage.setItem("workout", JSON.stringify(workout));
  }, [workout]);

  // Fetch workout data from API
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch("/api/workout");
        if (response.ok) {
          const json = await response.json();
          // Filter out any workouts that are already in state
          const newWorkouts = json.filter(newWorkout =>
            !workout.some(existingWorkout => existingWorkout.id === newWorkout.id)
          );
          setWorkout(prevWorkout => [...prevWorkout, ...newWorkouts]);
        } else {
          console.log("Failed to fetch workout data");
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };
    fetchWorkout();
  }, []);
  // Remove workout from state and update local storage
  const removeWorkout = (indexToRemove) => {
    const updatedWorkout = workout.filter(
      (_, index) => index !== indexToRemove
    );
    setWorkout(updatedWorkout);
    localStorage.setItem("workout", JSON.stringify(updatedWorkout));
  };

  return (
    <div className=" w-[90%]  md:w-[50%] p-5 md:p-10">
      {workout.map((workout, index) => (
        <WorkoutCom
          workout={workout}
          index={index}
          removeWorkout={() => removeWorkout(index)} // Pass removeWorkout function correctly
          key={index} // Ensure to provide a unique key
        />
      ))}
    </div>
  );
}

export default Home;
