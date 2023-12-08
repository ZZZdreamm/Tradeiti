import { CourseDto } from "../../models/Course";
import { GroupDto } from "../../models/GroupDto";
import "./Course.scss";

interface Props {
  course: CourseDto;
  handleOnClick?: (course: CourseDto, chooseGroup: GroupDto) => void;
}

export function CourseComponent({ course, handleOnClick = () => {} }: Props) {
  return (
    <div className="course">
      <h6>{course.course_name}</h6>
      <p>{course.course_id}</p>
      {course.groups.map((group, index) => (
        <div key={index} onClick={() => handleOnClick(course, group)}>
          <p className="course-class">{group.class_type_name}</p>
        </div>
      ))}
    </div>
  );
}
