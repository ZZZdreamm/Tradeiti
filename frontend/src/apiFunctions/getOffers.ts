// import { axiosBase } from "../config/axiosConfig";
import { axiosBase } from "../config/axiosConfig";
// import { mockedOffers } from "../mocks/MockedOffers";
import { OfferDto } from "../models/Offer";

export async function getOffers() {
  // return new Promise<OfferDto[]>((res, _) => {
  //   res(mockedOffers);
  // });
  return axiosBase.get<OfferDto[]>(`/offers/all/pending`).then((response) => {
    return response.data;
  });
}
