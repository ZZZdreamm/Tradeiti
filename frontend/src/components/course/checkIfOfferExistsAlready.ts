import { OfferDto } from "../../models/Offer";

export function checkIfOfferExistsAlready(
  offers: OfferDto[] | undefined,
  courseId: string,
  classType: string
): boolean {
  if (!offers) return false;
  return !offers.some(
    (offer) =>
      offer.my_course.course_id === courseId &&
      offer.my_course.groups[0].class_type_name === classType
  );
}
