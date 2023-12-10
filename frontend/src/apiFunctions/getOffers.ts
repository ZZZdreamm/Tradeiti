import { axiosBase } from "../config/axiosConfig";
import { OfferDto } from "../models/Offer";
import { OfferStatus } from "../models/OfferStatus";

export async function getOffers(state: OfferStatus) {
  return axiosBase.get<OfferDto[]>(`/offers/all/${state}`).then((response) => {
    return response.data;
  });
}
