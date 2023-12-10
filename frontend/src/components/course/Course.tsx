import { useQuery } from "react-query";
import { CourseDto } from "../../models/Course";
import { GroupDto } from "../../models/GroupDto";
import "./Course.scss";
import { getUserOffers } from "../../apiFunctions/getUserOffers";
import { checkIfOfferExistsAlready } from "./checkIfOfferExistsAlready";

interface Props {
  course: CourseDto;
  handleOnClick?: (course: CourseDto, chooseGroup: GroupDto) => void;
}

export function CourseComponent({ course, handleOnClick = () => {} }: Props) {
  const { data: myOffers } = useQuery("offers", getUserOffers);
  const groupsToShow = course.groups.filter((group) =>
    checkIfOfferExistsAlready(myOffers, course.course_id, group.class_type_name)
  );
  return (
    <div className={`course ${groupsToShow.length === 0 && "unavailable"}`}>
      <h6>{course.course_name}</h6>
      <p>{course.course_id}</p>
      {groupsToShow.map((group, index) => (
        <div key={index} onClick={() => handleOnClick(course, group)}>
          <p className="course-class">{group.class_type_name}</p>
        </div>
      ))}
    </div>
  );
}
