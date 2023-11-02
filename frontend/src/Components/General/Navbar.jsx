import React, { useContext, useState } from "react";
import "../CssFiles/GeneralCss/Navbar.css";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const router = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [drop, setDrop] = useState(false);

  const openDash = () => {
    setIsActive(true);
  };

  const closeDash = () => {
    setIsActive(false);
  };

  const openDrop = () => {
    setDrop(true);
  };

  const closeDrop = () => {
    setDrop(false);
  };

  return (
    <div>
      <div id="nav">
        <div>
          <i onClick={openDash} class="fa-solid fa-bars fa-lg"></i>
          <img onClick={() => router("/")} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2zAPtfFpuxis8hsoXYWfwoXqRzehfCcgMWA&usqp=CAU" />
        </div>
        <div>
          <i class="fa-regular fa-envelope fa-lg"></i>
          <i class="fa-regular fa-bell fa-lg"></i>
          <div style={{ display: "flex" }}>
            <i
              style={{ marginTop: "10px", marginRight: "10px" }}
              class="fa-regular fa-circle-user fa-lg"
              onClick={openDrop}
            ></i>
            {state?.user ? (
              <p>{state?.user?.name} </p>
            ) : (
              <p onClick={() => router("/login")}>Sign in</p>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------****------------------------------------------------ */}

      <div className={`login-form ${isActive ? "active" : ""}`}>
        {state?.user?.role == "Admin" ? (
          <div>
            <div id="left">
              <div>
                <i class="fa-solid fa-house"></i>
                <p>Dashboard</p>
              </div>
              <div>
                <i class="fa-solid fa-chalkboard-user"></i>
                <p onClick={() => router("/allinstructors")}>Instructors</p>
              </div>
              <div>
                <i class="fa-solid fa-book-open-reader"></i>
                <p onClick={() => router("/allcourses")}>All Courses</p>
              </div>
              <div>
                <i class="fa-regular fa-square-plus"></i>
                <p onClick={() => router("/addcourse")}>Add Courses</p>
              </div>
              <div>
              <i class="fa-solid fa-hand-holding-heart"></i>
                <p onClick={() => router("/assigninstructor")}>Assign Task</p>
              </div>
              <div>
                <i class="fa-solid fa-calendar-days"></i>
                <p>Calender</p>
              </div>
              <div>
                <i class="fa-solid fa-circle-user"></i>
                <p>My Profile</p>
              </div>
              <div onClick={closeDash} style={{ marginTop: "140px" }}>
                <i class="fa-regular fa-circle-xmark"></i>
                <p>Close</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div id="left">
              <div>
                <i class="fa-solid fa-house"></i>
                <p>Dashboard</p>
              </div>
              <div>
                <i class="fa-solid fa-book-open-reader"></i>
                <p>All Courses</p>
              </div>
              <div>
                <i class="fa-solid fa-list-check"></i>
                <p>Assigned Courses</p>
              </div>
              <div>
                <i class="fa-solid fa-book"></i>
                <p>Notes</p>
              </div>
              <div>
                <i class="fa-solid fa-calendar-days"></i>
                <p>Calender</p>
              </div>
              <div>
                <i class="fa-solid fa-circle-user"></i>
                <p>My Profile</p>
              </div>
              <div onClick={closeDash} style={{ marginTop: "200px" }}>
                <i class="fa-regular fa-circle-xmark"></i>
                <p>Close</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------****------------------------------------------------ */}
      {drop ?
      <div id="dropdown" onMouseLeave={closeDrop}>
        {!state?.user ?
        <div>
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
        <p>Sign Up</p>
        </div> :
        <div>
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <p onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</p>
        </div>
        }
        
        
      </div> : null }
    </div>
  );
};

export default Navbar;
