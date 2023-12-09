import { axiosBase } from "../config/axiosConfig";

export function rejectOffer(offer_id: string) {
  return axiosBase.patch(`/offers/reject/${offer_id}`);
}
