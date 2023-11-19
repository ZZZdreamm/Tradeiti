import axios from "axios";

let apiBaseUrl = "https://www.arcziweb.com/api/";

if (process.env.NODE_ENV === "development") {
  apiBaseUrl = "http://localhost:8090/api/";
}

export const axiosBase = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
  },
});
