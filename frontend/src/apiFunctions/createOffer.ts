import { axiosBase } from "../config/axiosConfig";
import { OfferCreationDto } from "../models/OfferCreationDto";

export function createOffer(offer: OfferCreationDto) {
  return axiosBase.post("/offers/create", offer);
}
