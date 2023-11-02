import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../ApiConfig";
import "../CssFiles/CourseCss/AllCourses.css";
import Navbar from "../General/Navbar";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const router = useNavigate(); 

  useEffect(() => {
    async function getCourses() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await api.get("/all-courses", { token });
        if (response.data.success) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCourses();
  }, []);
  
  return (
    <div>
      <Navbar/>
      <div id="background">
      {courses.map((cor) => (
        <div
          onClick={() => router(`/singlecourse/${cor._id}`)}
          key={cor._id}
          id="course" 
        >
          <img src={cor.image} />
          <h3>{cor.name}</h3>
          <p>{cor.level}</p>
          <p>{cor.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default AllCourses;
