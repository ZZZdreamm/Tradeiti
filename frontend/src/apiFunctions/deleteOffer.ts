import { axiosBase } from "../config/axiosConfig";

export function removeOffer(offer_id: string) {
  return axiosBase.delete(`/offers/delete/${offer_id}`);
}
