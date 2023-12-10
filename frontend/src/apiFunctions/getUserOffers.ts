import { axiosBase } from "../config/axiosConfig";
import { OfferDto } from "../models/Offer";
import { offerToNumber } from "../models/enums/OfferStatus";

export function getUserOffers() {
  return axiosBase.get<OfferDto[]>(`/offers/all/user`).then((response) => {
    return response.data.sort(
      (offer1, offer2) =>
        offerToNumber[offer2.state] - offerToNumber[offer1.state]
    );
  });
}
