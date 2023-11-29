import { Loader } from "../../common/loader/Loader";
import { CourseDto } from "../../models/Course";
import { CourseComponent } from "../course/Course";

interface Props {
  courses: CourseDto[] | undefined;
  handleOnClick?: (course: CourseDto) => void;
}

export function CoursesList({ courses, handleOnClick }: Props) {
  return (
    <>
      {courses ? (
        <div className="coursesBox">
          {courses.map((course, index) => (
            <CourseComponent
              key={index}
              course={course}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
