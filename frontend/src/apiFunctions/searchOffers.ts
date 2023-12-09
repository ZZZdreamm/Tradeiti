// import { axiosBase } from "../config/axiosConfig";
// import { OfferDto } from "../models/Offer";
import { mockedOffers } from "../mocks/MockedOffers";
import { SearchOfferOptions } from "../models/SearchOfferOptions";

export function searchOffers(searchValues: SearchOfferOptions) {
  if (searchValues) {
  }
  return mockedOffers;
}
