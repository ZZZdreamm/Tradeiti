import { axiosBase } from "../config/axiosConfig";

export function requestOffer(offer_id: string) {
  return axiosBase.patch(`/offers/send-request/${offer_id}`);
}
