import { axiosBase } from "../config/axiosConfig";
import { mockedOffers } from "../mocks/MockedOffers";
import { Offer } from "../models/Offer";

export function getOfferRequests() {
  return new Promise<Offer[]>((res, _) => {
    res(mockedOffers);
  });

  return axiosBase.get<Offer[]>(`/offers/requests`).then((response) => {
    return response.data;
  });
}
