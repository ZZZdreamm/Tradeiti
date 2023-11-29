import { CourseDateData } from "./CourseDate";
import { OfferStatus } from "./OfferStatus";

export interface Offer {
  offer_id: string;
  course_name: string;
  selled_date_data: CourseDateData[];
  exchanged_date_data: CourseDateData[];
  requester_id: string;
  accepter_id: string;
  status: OfferStatus;
}
