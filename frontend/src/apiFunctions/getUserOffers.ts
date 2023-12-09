import { axiosBase } from "../config/axiosConfig";
// import { mockedMyOffers } from "../mocks/MockedMyOffers";
import { OfferDto } from "../models/Offer";

export function getUserOffers() {
  // return new Promise<Offer[]>((resolve, _) => {
  //   resolve(mockedMyOffers);
  // });
  return axiosBase.get<OfferDto[]>(`/offers/all/user`).then((response) => {
    return response.data;
  });
}
