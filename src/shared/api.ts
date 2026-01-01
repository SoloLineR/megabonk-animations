import axios from "axios";

const api_instance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});
