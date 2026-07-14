import axios from "axios";

export const api = axios.create({
  baseURL: "https://coffeeshop-backend-ly1f.onrender.com/api",
});