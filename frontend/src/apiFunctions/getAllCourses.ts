import { axiosBase } from "../config/axiosConfig";
// import { mockedCourses } from "../mocks/MockedCourses";
import { CourseDto } from "../models/Course";

export function getAllCourses() {
  // return Promise.resolve(mockedCourses);
  return axiosBase.get<CourseDto[]>(`/courses/user`).then((response) => {
    return response.data;
  });
}
