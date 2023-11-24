import axios from "axios";
// import { JWT_TOKEN } from "./constants";

export let apiBaseUrl = "https://www.arcziweb.com/api";

if (process.env.NODE_ENV === "development") {
  apiBaseUrl = "http://localhost:8090/api";
}

export const axiosBase = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    // Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
    "Content-Type": "application/json",
  },
});
