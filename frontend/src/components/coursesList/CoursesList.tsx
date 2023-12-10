import { Loader } from "../../common/loader/Loader";
import { CourseDto } from "../../models/Course";
import { GroupDto } from "../../models/GroupDto";
import { CourseComponent } from "../course/Course";

interface Props {
  courses: CourseDto[] | undefined;
  handleOnClick?: (course: CourseDto, chooseGroup: GroupDto) => void;
  inOffers: boolean;
}

export function CoursesList({ courses, handleOnClick, inOffers }: Props) {
  return (
    <>
      {courses ? (
        <div className="coursesBox">
          {courses.map((course, index) => (
            <CourseComponent
              key={index}
              course={course}
              handleOnClick={handleOnClick}
              inOffers={inOffers}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
