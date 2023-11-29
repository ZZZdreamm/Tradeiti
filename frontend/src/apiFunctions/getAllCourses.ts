import { axiosBase } from "../config/axiosConfig";

export function getAllCourses() {
  return axiosBase.get(`/courses/user`).then((response) => {
    return response.data;
  });
}
