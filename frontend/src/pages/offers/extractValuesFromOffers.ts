import { OfferDto } from "../../models/Offer";

export function extractSimpleValuesFromOffers(key: string, offers: OfferDto[]) {
  const values = [""];
  offers.forEach((offer: any) => values.push(offer.my_course[key]));
  return [...new Set(values)].sort();
}

export function extractLecturersFromOffers(offers: OfferDto[]) {
  const values: string[] = [""];
  offers.forEach((offer) => {
    offer.my_course.groups[0].lecturers.forEach((lecturer) => {
      values.push(lecturer);
    });
  });
  return [...new Set(values)].sort();
}

export function extractDatesFromOffers(offers: OfferDto[]) {
  const values: string[] = [""];
  offers.forEach((offer) => {
    const date = ""
      .concat(offer.my_course.groups[0].weekday, ", ")
      .concat(offer.my_course.groups[0].start_time, "-")
      .concat(offer.my_course.groups[0].end_time);
    values.push(date);
  });
  return [...new Set(values)].sort();
}
