
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import { useContext, useState } from 'react';
import api from '../ApiConfig';

const AddCourses = () => {

  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    image: "",
    description: "", lecture1:"", lecture2:"",  lecture3:"",
  });

  const { state } = useContext(AuthContext);
  const router = useNavigate();

  const handleChange = (event) => {
    setCourseData({ ...courseData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      courseData.name &&
      courseData.level &&
      courseData.image &&
      courseData.description &&
      courseData.lecture1 &&
      courseData.lecture2 &&
      courseData.lecture3
    ) {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await api.post("/add-course", {
          token,
          courseData,
        });
        if (response.data.success) {
          setCourseData({ name: "", level: "", image: "", description: "", lecture1:"", lecture2:"",  lecture3:""});
          router("/allcourses");
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("All fields are mandtory.");
    }
  };
  console.log(courseData, "courseData")
    
  return (
    <div id='regbody'>
    <div >
      <form onSubmit={handleSubmit} id='regform'>
          <label>Course Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleChange}
          />
          <br />
          
          <label>Course Level :</label>
          <br />
          <input
            type="text"
            name="level"
            value={courseData.price}
            onChange={handleChange}
          />
          <br />
          <label>Course Description :</label><br />
          <input
            type="text"
            name="description"
            value={courseData.description}
            onChange={handleChange}
          />
          <br />
          <label>Course Image :</label>
          <br />
          <input
            type="text"
            name="image"
            value={courseData.image}
            onChange={handleChange}
          />
          <br />
          <label>Lecture 1 :</label>
          <br />
          <input
            type="text"
            name="lecture1"
            value={courseData.lecture1}
            onChange={handleChange}
          />
          <br />
          <label>Lecture 2 :</label>
          <br />
          <input
            type="text"
            name="lecture2"
            value={courseData.lecture2}
            onChange={handleChange}
          />
          <br />
          <label>Lecture 3 :</label>
          <br />
          <input
            type="text"
            name="lecture3"
            value={courseData.lecture3}
            onChange={handleChange}
          />
          <br />
          <button  value="Add Course">Add Course</button>
          <i style={{marginTop:"5%",marginLeft:"47%",color:"grey"}} onClick={() => router("/")} class="fa-regular fa-circle-xmark fa-xl"></i>
      </form>
    </div>
    </div>
  )
}

export default AddCourses