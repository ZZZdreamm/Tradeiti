import { axiosBase } from "../config/axiosConfig";
import { Offer } from "../models/Offer";

export function addOffer(offer:Offer){
    return axiosBase.post("/add-offer", offer);
}