import React, { useContext } from "react";
import Navbar from "./Navbar";
import { AuthContext } from "../Context/AuthContext";
import "../CssFiles/GeneralCss/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { state } = useContext(AuthContext);
  const router = useNavigate();

  return (
    <div id="screen">
      <Navbar />
      {!state?.user ? (
        <div id="allhome">
          <h1>Welcome To eGurukul</h1>
          <p>What can you achieve with eGurukul?</p>
          <div>
            <img src="https://c8.alamy.com/comp/2M9020P/business-growth-business-development-motif-vector-illustration-2M9020P.jpg" />
            <p>Build your Knowledge Step by Step and in Detail.</p>
          </div>
          <div>
            <p>Discuss topic with your Instructor personally.</p>
            <img src="https://c8.alamy.com/comp/PE5Y6B/new-idea-concept-over-light-lamp-background-business-people-relationships-gadgets-office-desk-flat-PE5Y6B.jpg" />
          </div>
          <div>
            <img src="https://c8.alamy.com/compes/2j2f2w9/equipo-de-ingenieros-trabajando-juntos-en-el-mecanismo-usando-el-ordenador-portatil-hablando-sentado-en-marcha-escribiendo-codigos-ilustracion-vectorial-para-trabajo-en-equipo-ingenieria-2j2f2w9.jpg" />
            <p>Join Study Rooms with your peers.</p>
          </div>
          <div>
            <p>Solve 1000+ Quizzes and Puzzles</p>
            <img src="https://thumbs.dreamstime.com/z/group-people-connecting-puzzle-elements-business-team-assembling-solving-difficult-problem-teamwork-cooperation-concept-cartoon-202770260.jpg" />
          </div>
          <div>
            <img src="https://img.freepik.com/premium-vector/happy-person-holding-up-winning-trophy_52474-590.jpg?size=626&ext=jpg" />
            <p>And be the Best Version of Yourself</p>
          </div>
          <p style={{ marginTop: "40px" }}>So what are you waiting for?</p>
          <h1 style={{ marginBottom: "40px" }}>
            Enroll in eGurukul with 100+ online Courses{" "}
          </h1>
        </div>
      ) : (
        <div>
          {state?.user?.role == "Admin" ? (
            <div id="admhome">
              <h1>Welcome {state?.user?.name}</h1>
              <p>({state?.user?.role})</p>
              <img src="https://img.freepik.com/premium-vector/data-base-administrator_118813-14216.jpg?w=2000" />
            </div>
          ) : (
            <div id="admhome">
              <h1>Welcome {state?.user?.name}</h1>
              <p>({state?.user?.role})</p>
              <img src="https://previews.123rf.com/images/leilavi/leilavi1812/leilavi181200031/123180501-vector-illustration-concept-of-young-people-use-online-technical-support-customer-service-male.jpg" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
