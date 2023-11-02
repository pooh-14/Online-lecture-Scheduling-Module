import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import {
  Login,
  Register,
  getAllInstructors,
  getCurrentUser,
} from "./Controllers/User.controller.js";
import { isAdmin } from "./Middlewares/All.Middleware.js";
import {
  addCourse,
  allCourses,
  deleteCourse,
  getSingleCourse,
  updateCourse,
} from "./Controllers/Course.controller.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Working!");
});

app.post("/register", Register);

app.post("/login", Login);

app.post("/get-current-user", getCurrentUser);

app.post("/add-course", isAdmin, addCourse);

app.get("/all-courses", allCourses);

app.post("/get-all-instructors", isAdmin, getAllInstructors);

app.patch("/update-your-course", updateCourse);

app.post("/get-single-course", getSingleCourse);

app.delete("/delete-your-course", deleteCourse);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB!");
});

app.listen(8000, () => {
  console.log("Server running on port 8000!");
});
