import React, { useState } from "react";
import { useParams } from "react-router-dom";

function WorkoutCom({ workout, index, removeWorkout }) {
  const [workoutdelete, setworkoutdelete] = useState("")
 
  const handleDelete = () => {
    // Call removeWorkout function and pass the index (or workout id) as an argument
    removeWorkout(index); // Pass index or unique identifier of the workout to delete
  };
 




  return (
    <div key={index} className="bg-gray-100 rounded-lg p-1 md:p-4 mb-2 md:mb-4  t">
      <div className="mb-2">
        <h1 className="text-xl font-semibold">{workout.title}</h1>
      </div>
      <div className="flex-col">
        <div className="flex flex-col mr-2 md:mr-4">
          <span className="text-gray-700">Reps:</span>
          <span className="text-gray-900">{workout.reps}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-700">Load:</span>
          <span className="text-gray-900">{workout.load}</span>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleDelete}
          className="bg-teal-400 text-white py-1 px-3 rounded hover:bg-white hover:text-teal-700"
        >
          Delete
        </button>
       
      </div>
    </div>
  );
}

export default WorkoutCom;
