import { axiosBase } from "../config/axiosConfig";
import { OfferDto } from "../models/Offer";
import { OfferStatus } from "../models/enums/OfferStatus";
import {mockedOffers} from "../mocks/MockedOffers"

export async function getOffers(state: OfferStatus) {
  return Promise.resolve(mockedOffers);
  return axiosBase.get<OfferDto[]>(`/offers/user/${state}`).then((response) => {
    return response.data;
  });
}
