import React, { useState } from "react";
import { Link } from "react-router-dom";

function WorkoutCom({ workout, index   , onRemove  }) {


  return (
    <div className="bg-gray-100 rounded-lg p-2 md:p-4 mb-2 md:mb-4   ">
      <div key={index} className="mb-2  ">
        <h1 className="text-xl font-semibold">{workout.title}</h1>
      </div>
      <div className="flex-col">
        <div className="flex  flex-col mr-2 md:mr-4">
          <span className="text-gray-700">Reps:</span>
          <span className="text-gray-900">{workout.reps}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-700">Load:</span>
          <span className="text-gray-900">{workout.load}</span>
        </div>
      </div>
      <div className="mt-4">
        <Link 
         onClick={onRemove}
          className="bg-teal-500 text-white py-1 px-4 rounded hover:bg-white hover:text-teal-700"
         
        >
          Delete
        </Link >
      </div>
    </div>
  );
}

export default WorkoutCom;
