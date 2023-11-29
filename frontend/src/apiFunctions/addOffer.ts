import { axiosBase } from "../config/axiosConfig";
import { OfferCreationDto } from "../models/OfferCreationDto";

export function addOffer(offer:OfferCreationDto){
    return axiosBase.post("/add-offer", offer);
}