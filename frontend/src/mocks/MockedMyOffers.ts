import { Offer } from "../models/Offer";
import { OfferStatus } from "../models/OfferStatus";

export const mockedMyOffers: Offer[] = [
  {
    offer_id: "sadasda-sadad-asd",
    course_name: "Bazdy danych",
    start_time: "10:00 pon",
    lecturer: "Lecturer tomek",
    requester_id: "user1",
    accepter_id: "user2",
    status: OfferStatus.accepted,
  },
  {
    offer_id: "2",
    course_name: "Offer 2",
    start_time: "2023-11-18T14:30:00",
    lecturer: "Lecturer 2",
    requester_id: "user3",
    accepter_id: "user4",
    status: OfferStatus.pending,
  },
  {
    offer_id: "3",
    course_name: "Offer 3",
    start_time: "2023-11-19T12:45:00",
    lecturer: "Lecturer 3",
    requester_id: "user5",
    accepter_id: "user6",
    status: OfferStatus.pending,
  }
];
