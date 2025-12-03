import axios from "axios";

const api = axios.create({
  baseURL: "https://pta-marcos-didier-mobile.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
