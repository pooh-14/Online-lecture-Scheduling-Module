import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import api from "../ApiConfig";
import { AuthContext } from "../Context/AuthContext";
import '../CssFiles/GeneralCss/Register.css'


const Register = () => {

  const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Admin"})

  const { state } = useContext(AuthContext)
  const router = useNavigate()

  const handleChange = (event) => {  
      setUserData({ ...userData, [event.target.name]: event.target.value })
  }
  const selectRole = (event) => {
      setUserData({ ...userData, "role": event.target.value })
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (userData.name && userData.email && userData.password && userData.confirmPassword && userData.role) {
          if (userData.password === userData.confirmPassword) {
              const response = await api.post("/register", {name:userData.name, email: userData.email, password: userData.password, confirmPassword: userData.confirmPassword, role: userData.role});
              if (response.data.success) {
                  setUserData({ name: "", email: "", password: "", confirmPassword: "", role: "Admin" })
                  router('/login')
                  toast.success(response.data.message)
              } else {
                  toast.error(response.data.message)
              }

          } else {
              toast.error("Password and Confirm Password not Matched.")
          }
      } else {
          toast.error("All fields are mandtory.")
      }
  }
  // console.log(userData, "userData")

  useEffect(() => {
      if (state?.user?.name) {
          router('/')
      }
  }, [state])

    return (
        <div id='regbody'>
          <div>
          <form onSubmit={handleSubmit} id='regform'>
              <p> SIGN UP</p>
              <label>Select Role :</label>
    
              <select
                onChange={selectRole}
              >
                <option value="Admin">Admin</option>
                <option value="Instructor">Instructor</option>
              </select>
              <br />
    
              <label>Name:</label>
              <br />
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
              <br />
    
              <label>Email:</label>
              <br />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              <br />
              <label>Password:</label>
              <br />
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              <br />
              <label>Confirm Password:</label>
              <br />
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
              <br />
              <button>SIGN UP</button>
              <p style={{marginTop:"9%", fontSize:"14px",marginLeft:"28%"}}
                onClick={() => router("/login")}
              >
                Already have an account? <u style={{color:"rgb(9, 83, 179)"}}>SIGN IN</u>
              </p>
          </form>
          </div>
        </div>
      );
}

export default Register