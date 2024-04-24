import axios from "axios";
const BASE_URL = "https://ab-movies-backend-7r0c.onrender.com";
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});
