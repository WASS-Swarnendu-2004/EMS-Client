import axios from "axios";

const api = axios.create({
  baseURL:
    "https://student-management-system-1-8vvp.onrender.com",
});

export default api;