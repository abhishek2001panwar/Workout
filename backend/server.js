import express from "express";
import  {router as workoutRouter} from "./routes/workout.js";
import  {router as userRouter}  from "./routes/user.route.js"
import mongoose from "mongoose";
const app = express();

app.use(express.json());
app.use("/api/workout", workoutRouter);
app.use("/api/user", userRouter);


mongoose
  .connect("mongodb+srv://abhishekpanwarcseiot2022:5625panwar@workout.zogzbpf.mongodb.net")
  .then(() => {
    app.listen(4000, () => {
      console.log(" server is ready at port!! db connected",4000);
      
    });
  })
  .catch((error) => {
    console.log(error.message, " error connecting to database");
  });
