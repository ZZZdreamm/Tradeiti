import { CourseDto } from "../Course";
import { CourseDateData } from "../CourseDate";

export interface FormOffer {
  course: CourseDto;
  myHour: CourseDateData;
  opponentHour: CourseDateData;
}
