import { CourseDto } from "../../models/Course";
import { GroupDto } from "../../models/GroupDto";

export function getCourseDateFromCourses(
  courses: CourseDto[] | undefined,
  course_id: string | null,
  class_type_name: string | null
) {
  if (!course_id || !class_type_name) return undefined
  const myGroup = courses
    ?.find((course) => course.course_id === course_id)
    ?.groups.find((group) => group.class_type_name === class_type_name);
  if (!myGroup) return undefined
  const courseDate: GroupDto = {
    lecturers: myGroup.lecturers,
    weekday: myGroup.weekday,
    start_time: myGroup.start_time,
    end_time: myGroup.end_time,
    group_number: myGroup.group_number,
    class_type_name: myGroup.class_type_name,
  };
  return [courseDate];
}
