import { axiosBase } from "../config/axiosConfig";
import { mockedOffers } from "../mocks/MockedOffers";
import { Offer } from "../models/Offer";
import { SearchOfferOptions } from "../models/SearchOfferOptions";

export async function searchOffers(searchValues: SearchOfferOptions) {
  return await new Promise<Offer[]>((res, _) => {
    res(mockedOffers.filter((offer) => offer.status === "pending"));
  });

  return axiosBase.post("/offers/search", searchValues).then((response) => {
    return response.data;
  });
}
