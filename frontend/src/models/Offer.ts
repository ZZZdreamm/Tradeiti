import { CourseDto } from "./Course";
import { OfferStatus } from "./enums/OfferStatus";

export interface OfferDto {
  offer_id: string;
  owner_username: string;
  receiver_username: string;
  state: OfferStatus;
  my_course: CourseDto;
  wanted_course: CourseDto;
}
