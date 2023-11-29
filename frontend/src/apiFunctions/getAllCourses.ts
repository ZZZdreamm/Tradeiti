import { axiosBase } from "../config/axiosConfig";
import { CourseDto } from "../models/Course";

export function getAllCourses() {
  return axiosBase.get<CourseDto[]>(`/courses/user`).then((response) => {
    return response.data;
  });
}
