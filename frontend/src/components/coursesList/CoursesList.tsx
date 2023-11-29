import { CourseDto } from "../../models/Course";
import { CourseComponent } from "../course/Course";

interface Props {
  courses: CourseDto[];
  handleOnClick?: (course: CourseDto) => void;
}

export function CoursesList({ courses, handleOnClick }: Props) {
  return (
    <>
      {courses &&
        courses.map((course, index) => (
          <CourseComponent
            key={index}
            course={course}
            handleOnClick={handleOnClick}
          />
        ))}
    </>
  );
}
