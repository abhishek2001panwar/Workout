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
          setWorkout((prevWorkout) => [...prevWorkout, ...json]);
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
    setWorkout((prevWorkout) =>
      prevWorkout.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="w-[65%] p-10">
      {workout.map((workout, index) => (
        <WorkoutCom
          workout={workout}
          key={index}
          onRemove={() => removeWorkout(index)}
        />
      ))}
    </div>
  );
}

export default Home;
