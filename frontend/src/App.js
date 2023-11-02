import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/General/Register";
import Login from "./Components/General/Login";
import Home from "./Components/General/Home";
import AddCourses from "./Components/Courses/AddCourses";
import AllCourses from "./Components/Courses/AllCourses";
import AllInstructors from "./Components/Instructors/AllIntructors";
import AssignInstructor from "./Components/Courses/AssignInstructor";
import SingleCourse from "./Components/Courses/SingleCourse";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/addcourse" element={<AddCourses/>} />
        <Route exact path="/allcourses" element={<AllCourses/>} />
        <Route exact path="/allinstructors" element={<AllInstructors/>} />
        <Route exact path="/assigninstructor" element={<AssignInstructor/>} />
        <Route exact path="/singlecourse" element={<SingleCourse/>} />
      </Routes>
    </div>
  );
}

export default App;
