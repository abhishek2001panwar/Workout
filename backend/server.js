import express from "express";
import  {router as workoutRouter} from "./routes/workout.js";
import  {router as userRouter}  from "./routes/user.route.js"
import  {router as buildRouter}  from "./routes/frontrend.routes.js"

import mongoose from "mongoose";
const path = require('path');
const app = express();

app.use(express.json());
app.use("/api/workout", workoutRouter);
app.use("/api/user", userRouter);
app.use("/", buildRouter);




mongoose
  .connect("mongodb+srv://abhishekpanwarcseiot2022:5625panwar@workout.zogzbpf.mongodb.net")
  .then(() => {
    app.listen(5000, () => {
      console.log(" server is ready at port!! db connected",5000);
      
    });
  })
  .catch((error) => {
    console.log(error.message, " error connecting to database");
  });
  if (process.env.NODE_ENV === 'production' || "production") {
    app.use(express.static(path.resolve(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
    });
  }
