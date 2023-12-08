import { CourseDto } from "../../models/Course";
import { CourseDateData } from "../../models/CourseDate";

export function getCourseDateFromCourses(
  courses: CourseDto[] | undefined,
  course_id: string | null,
  class_type_name: string | null
) {
  if (!course_id || !class_type_name)
    throw new Error("course_id or class_type_name is null");
  const myGroup = courses
    ?.find((course) => course.course_id === course_id)
    ?.groups.find((group) => group.class_type_name === class_type_name);
  if (!myGroup) throw new Error("Group not found");
  const courseDate: CourseDateData = {
    lecturers: myGroup.lecturers,
    weekday: myGroup.weekday,
    start_time: myGroup.start_time,
    end_time: myGroup.end_time,
  };
  return [courseDate];
}
