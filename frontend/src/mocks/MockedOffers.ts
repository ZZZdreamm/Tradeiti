import { Offer } from "../models/Offer";
import { OfferStatus } from "../models/OfferStatus";

export const mockedOffers: Offer[] = [
  {
    offer_id: "sadasda-sadad-asd",
    course_name: "Bazdy danych",
    selled_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    exchanged_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    requester_id: "user1",
    accepter_id: "user2",
    status: OfferStatus.accepted,
  },
  {
    offer_id: "2",
    course_name: "Offer 2",
    selled_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    exchanged_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    requester_id: "user3",
    accepter_id: "user4",
    status: OfferStatus.pending,
  },
  {
    offer_id: "3",
    course_name: "Offer 3",
    selled_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    exchanged_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    requester_id: "user5",
    accepter_id: "user6",
    status: OfferStatus.pending,
  },
  {
    offer_id: "4",
    course_name: "Offer 3",
    selled_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    exchanged_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    requester_id: "user5",
    accepter_id: "user6",
    status: OfferStatus.accepted,
  },
  {
    offer_id: "5",
    course_name: "Offer 3",
    selled_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    exchanged_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    requester_id: "user5",
    accepter_id: "user6",
    status: OfferStatus.pending,
  },
  {
    offer_id: "6",
    course_name: "Offer 3",
    selled_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    exchanged_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    requester_id: "user5",
    accepter_id: "user6",
    status: OfferStatus.pending,
  },
  {
    offer_id: "7",
    course_name: "Offer 3",
    selled_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    exchanged_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    requester_id: "user5",
    accepter_id: "user6",
    status: OfferStatus.pending,
  },
  {
    offer_id: "8",
    course_name: "Offer 3",
    selled_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    exchanged_date_data: {
      course_day: "Poniedziałek",
      course_time: "12:00-14:00",
      lecturer: "dr hab. inż. Jan Kowalski",
    },
    requester_id: "user5",
    accepter_id: "user6",
    status: OfferStatus.pending,
  },
];
