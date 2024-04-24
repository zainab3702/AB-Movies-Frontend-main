import axios from "axios";
const BASE_URL = "https://ab-movies-backend-8uu1.onrender.com";
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});
