import { Course } from "../../models/Course";
import "./Course.scss";

interface Props {
  course: Course;
}

export function CourseComponent({ course }: Props) {
  return (
    <div className = {'course'}>
      <h6>{course.course_name.pl}</h6>
      <p>{course.course_id}</p>
    </div>
  );
}
