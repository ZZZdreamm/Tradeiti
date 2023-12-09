import { OfferDto } from "../../models/Offer";
import { SearchOfferOptions } from "../../models/SearchOfferOptions";

export function filterOffers(
  searchValues: SearchOfferOptions,
  offers: OfferDto[]
) {
  if (searchValues.course_id) {
    offers = offers.filter(
      (offer) => offer.my_course.course_id === searchValues.course_id
    );
  }
  if (searchValues.course_name) {
    offers = offers.filter(
      (offer) => offer.my_course.course_name === searchValues.course_name
    );
  }
  if (searchValues.lecturer) {
    offers = offers.filter((offer) =>
      offer.my_course.groups[0].lecturers.includes(searchValues.lecturer)
    );
  }
  if (searchValues.date) {
    const [weekday, time] = searchValues.date.split(", ");
    const start_time = time.split("-")[0];
    const end_time = time.split("-")[1];
    console.log(weekday, start_time, end_time);
    offers = offers.filter(
      (offer) =>
        offer.my_course.groups[0].weekday === weekday &&
        offer.my_course.groups[0].start_time === start_time &&
        offer.my_course.groups[0].end_time === end_time
    );
  }
  return offers;
}
