import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../ApiConfig';
import Navbar from '../General/Navbar';

const AssignInstructor = () => {
  const [courses, setCourses] = useState('');
  const [instructor, setInstructor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAssignInstructor = () => {
    axios
      .post('/api/lectures/assign-instructor', { courses, instructor})
      .then((response) => {
        setSuccess('Instructor assigned successfully');
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

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
    <div  >
      <Navbar/>
      <div id='background2'>
      <div style={{textAlign:"center"}}>
      <h2 >Assign Instructor to Course</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <select  value={courses} onChange={(e) => setCourses(e.target.value)}>
        <option value="">Select a Course</option>
      </select>
      <select style={{textAlign:"center"}} value={instructor} onChange={(e) => setInstructor(e.target.value)}>
        <option value="">Select an Instructor</option>
        {/* Populate the dropdown with available instructors */}
      </select>
      <button onClick={handleAssignInstructor}>Assign Instructor</button>
    </div>
      </div>
    </div>
  );
};

export default AssignInstructor;
