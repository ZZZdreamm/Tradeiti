import { axiosBase } from "../config/axiosConfig";
// import { mockedOffers } from "../mocks/MockedOffers";
import { OfferDto } from "../models/Offer";

export function getOfferRequests() {
  // return new Promise<OfferDto[]>((res, _) => {
  //   res(mockedOffers);
  // });
  return axiosBase.get<OfferDto[]>(`/offers/received`).then((response) => {
    return response.data;
  });
}
