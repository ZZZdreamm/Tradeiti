import { CourseDto } from "../Course";
import { GroupDto } from "../GroupDto";

export interface FormOffer {
  course: CourseDto;
  myHour: GroupDto;
  opponentHour: GroupDto;
}
