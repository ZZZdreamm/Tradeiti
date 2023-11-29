import { axiosBase } from "../config/axiosConfig";

export function acceptOffer(offer_id: string) {
  return new Promise<{ data: any; status: number }>((res, _) => {
    res({ data: "mocked value", status: 200 });
  });
  return axiosBase.patch(`/offers/accept?offer_id=${offer_id}`);
}
