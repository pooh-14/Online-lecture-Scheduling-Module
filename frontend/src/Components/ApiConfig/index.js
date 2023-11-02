import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const api = axios.create({
  baseURL: "https://admin-instructor-panel-rha5.onrender.com",
  headers: { Authorization: `Bearer ${token}` }
});

export default api; 