import { apiBaseUrl } from "../config/axiosConfig";
import { JWT_TOKEN } from "../config/constants";

export function getAllCourses() {
  return fetch(`${apiBaseUrl}/course-edtions`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
    },
  }).then((response) => {
    return response.json();
  });
}
