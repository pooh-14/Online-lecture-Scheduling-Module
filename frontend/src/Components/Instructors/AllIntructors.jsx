import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../ApiConfig";
import Navbar from "../General/Navbar";
// import "../CssFiles/CourseCss/AllInstructors.css";

const AllInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useNavigate(); 

  useEffect(() => {
    async function getInstructors() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await api.post("/get-all-instructors", { token });
        if (response.data.success) {
          setInstructors(response.data.instructors);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getInstructors();
  }, []);

  return (
    <div>
      <Navbar/>
      <div id="background2">
      <div style={{textAlign:"center"}}>
      <h2>Instructor List</h2>
      {loading ? (
        <p>Loading instructor data...</p>
      ) : (
        <ul>
          {instructors?.map((ins) => (
            <li key={ins?._id}>{ins?.name}</li>
          ))}
        </ul>
      )}
    </div>
      </div>
    </div>
  );
};

export default AllInstructors;
