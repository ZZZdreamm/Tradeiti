import { CourseDateData } from "./CourseDate";

export interface OfferCreationDto {
  course_id: string;
  selled_date_data: CourseDateData;
  exchanged_date_data: CourseDateData;
}
