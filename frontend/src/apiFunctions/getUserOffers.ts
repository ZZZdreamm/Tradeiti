import { axiosBase } from "../config/axiosConfig";
import { mockedMyOffers } from "../mocks/MockedMyOffers";

export function getUserOffers() {
  return new Promise((resolve, _) => {
    resolve(mockedMyOffers);
  });
  return axiosBase.get(`/offers/user`).then((response) => {
    return response.data;
  });
}
