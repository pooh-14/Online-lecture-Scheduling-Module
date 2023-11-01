import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/General/Register";
import Login from "./Components/General/Login";
import Home from "./Components/General/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
