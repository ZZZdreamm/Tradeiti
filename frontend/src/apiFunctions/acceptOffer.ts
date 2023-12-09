import { axiosBase } from "../config/axiosConfig";
import { OfferStatus } from "../models/OfferStatus";

export function acceptOffer(offer_id: string, state: OfferStatus) {
  if (state !== OfferStatus.REQUEST_SENT)
    throw new Error("Offer is not in the correct state to be accepted");
  return axiosBase.patch(`/offers/accept/${offer_id}`);
}
