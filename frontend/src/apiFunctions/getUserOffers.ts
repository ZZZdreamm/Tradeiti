import { axiosBase } from "../config/axiosConfig";
import { mockedMyOffers } from "../mocks/MockedMyOffers";
import { Offer } from "../models/Offer";

export function getUserOffers() {
  return new Promise((resolve, _) => {
    resolve(mockedMyOffers);
  });
  return axiosBase.get<Offer[]>(`/offers/user`).then((response) => {
    return response.data;
  });
}
