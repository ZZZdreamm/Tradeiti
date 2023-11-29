import { axiosBase } from "../config/axiosConfig";

export function finalizeOffer(offer_id: string) {
  return axiosBase.patch(`/offers/finalize?offer_id=${offer_id}`);
}