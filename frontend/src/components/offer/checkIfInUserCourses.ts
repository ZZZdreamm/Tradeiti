import { CourseDto } from "../../models/Course";

export function checkIfInUserCourses(
  course: CourseDto,
  userCourses: CourseDto[]
) {
  return userCourses.some(
    (userCourse) => userCourse.course_id === course.course_id
  );
}
