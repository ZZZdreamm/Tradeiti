// import { axiosBase } from "../config/axiosConfig";
import { mockedOffers } from "../mocks/MockedOffers";

export async function getOffers() {
  return new Promise<{ data: any }>((res, _) => {
    res({ data: mockedOffers });
  });
  //   const response = await axiosBase.get("/get-offers");
  //   return response.data;
}
