import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div id="adminp">
        <div id="aleft">
          <div>
            <i class="fa-solid fa-house"></i>
            <p>Dashboard</p>
          </div>
          <div>
            <i class="fa-solid fa-chalkboard-user"></i>
            <p>Instructors</p>
          </div>
          <div>
            <i class="fa-solid fa-book-open-reader"></i>
            <p>All Courses</p>
          </div>
          <div>
            <i class="fa-regular fa-square-plus"></i>
            <p>Add Courses</p>
          </div>
          <div>
            <i class="fa-solid fa-calendar-days"></i>
            <p>Calender</p>
          </div>
          <div>
            <i class="fa-solid fa-circle-user"></i>
            <p>My Profile</p>
          </div>
        </div>
        <div id="aright"></div>
      </div>

      <div id="instructp">
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
        </div>
        <div id="right"></div>
      </div>
    </div>
  );
};

export default Home;
