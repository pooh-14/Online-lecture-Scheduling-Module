import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../ApiConfig";
import { AuthContext } from "../Context/AuthContext";
import '../CssFiles/GeneralCss/Login.css'

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" })

    const { state, dispatch } = useContext(AuthContext)
    const router = useNavigate()

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            const response = await api.post("/login", { userData });
            if (response.data.success) {
                dispatch({
                    type: 'LOGIN',
                    payload: response.data.user
                })
                localStorage.setItem("token", JSON.stringify(response.data.token))
                setUserData({ email: "", password: "" })
                router('/')
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
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
    <div id="logbody">
      <div>
      <form onSubmit={handleSubmit} id="logform">
          <p>SIGN IN</p>
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
          <button>SIGN IN</button>
          <p style={{marginTop:"5%", fontSize:"14px",marginLeft:"28%"}}
            onClick={() => router("/register")}
          >Don't have an account? <u style={{color:"rgb(9, 83, 179)"}}>SIGN UP</u>
          </p>
          <i style={{marginTop:"45%",marginLeft:"45%",color:"grey"}} onClick={() => router("/")} class="fa-regular fa-circle-xmark fa-xl"></i>
      </form>
      </div>
    </div>
  );
};

export default Login;
