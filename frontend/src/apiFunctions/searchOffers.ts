import { axiosBase } from "../config/axiosConfig";
import { mockedOffers } from "../mocks/MockedOffers";
import { SearchOfferOptions } from "../models/SearchOfferOptions";

export async function searchOffers(searchValues: SearchOfferOptions) {
  return await new Promise<{ data: any }>((res, _) => {
    res({ data: mockedOffers.filter((offer) => offer.status === "pending") });
  });

  return await axiosBase.post("/offers/search", searchValues);
}
