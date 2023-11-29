// import { axiosBase } from "../config/axiosConfig";
import { axiosBase } from "../config/axiosConfig";
import { mockedOffers } from "../mocks/MockedOffers";

export async function getOffers() {
  return new Promise<{ data: any }>((res, _) => {
    res({ data: mockedOffers });
  });
  return axiosBase.get(`/offers`).then((response) => {
    return response.data;
  });
}
