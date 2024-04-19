import express from "express";
const router = express.Router();
import { PostWorkout,
     GetAllWorkout ,
      GetOneWorkout ,
      deleteWorkout , 
      updateWorkout } from "../controllers/workout.controller.js";
//get all workout
router.get("/", GetAllWorkout);
//get a single workout

router.get("/:id", GetOneWorkout);
//post a workout
router.post("/", PostWorkout);
// delete a workout
router.delete("/:id", deleteWorkout);
//update a workout
router.patch("/:id",  updateWorkout);
export {router}