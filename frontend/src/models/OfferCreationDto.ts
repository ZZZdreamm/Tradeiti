import { CourseDateData } from "./CourseDate";

export interface OfferCreationDto {
  course_id: string;
  course_name:string;
  my_date: CourseDateData;
  wanted_date: CourseDateData;
}
