import { Course } from "../../models/Course";
import "./Course.scss";

interface Props {
  course: Course;
  handleOnClick?: (course: Course) => void;
}

export function CourseComponent({ course, handleOnClick = () => {} }: Props) {
  return (
    <div className="course" onClick={() => handleOnClick(course)}>
      <h6>{course.course_name.pl}</h6>
      <p>{course.course_id}</p>
    </div>
  );
}
