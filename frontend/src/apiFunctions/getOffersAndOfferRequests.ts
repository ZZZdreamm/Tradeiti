import { axiosBase } from "../config/axiosConfig";
import { OfferDto } from "../models/Offer";
import { OfferStatus } from "../models/enums/OfferStatus";

export function getOffersAndOfferRequests(state: OfferStatus) {
  return axiosBase
    .get<OfferDto[]>(`/offers/user/present/${state}`)
    .then((response) => {
      return response.data;
    });
}
