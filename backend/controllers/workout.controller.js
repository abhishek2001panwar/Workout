import mongoose from "mongoose";
import { Workout } from "../models/workout.model.js";

//get all workout

const GetAllWorkout = async (req, res) => {
  try {
    const workout = await Workout.find({}).sort({ created_at: -1 });
    return res.json(workout);
  } catch (error) {
    console.log(error.message);
  }
  res.json({ mssg: "get All workout" });
};
// get a single workout
const GetOneWorkout = async (req, res) => {
  try {
    const { id } = req.params;

if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(200).json({ message: "No Such Workout" });
}
    const SingleWorkout = await Workout.findById(id);

    if (!SingleWorkout) {
      return res.status(200).json({ message: "No Single Workout" });
    }

    res.json(SingleWorkout);
  } catch (error) {
    console.log(error);
  }
};

//post a workout
const PostWorkout = async (req, res) => {
  try {
    const { title, load, reps } = req.body;
    const newWorkout = await Workout.create({ title, load, reps });
    res.json(newWorkout);
  } catch (error) {
    console.log(error.message);
  }
};

//delete aa workout
const deleteWorkout = async (req, res) => { 
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({message: "no such workout"})
        }

        const deleteWorkout = await Workout.findOneAndDelete({_id: id})
        if(!deleteWorkout){
            return res.status(404).json({message: "no such workout"})
        }
        res.json({message:"workout deleted " , deleteWorkout})
    } catch (error) {
        console.log(error.message);
    }
}

//update a workout
const updateWorkout = async (req, res) => { 
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({message: "no such workout"})
        }

        const updateWorkout = await Workout.findOneAndUpdate({_id: id}, { ...req.body })
        if(!updateWorkout){
            return res.status(404).json({message: "no such workout"})
        }
        res.json({
            message: "updated", updateWorkout
        })
    } catch (error) {
        console.log(error.message);
    }
}
export { PostWorkout , GetAllWorkout , GetOneWorkout ,deleteWorkout , updateWorkout};
