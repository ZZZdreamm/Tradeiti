import { axiosBase } from "../config/axiosConfig";

export function removeOffer(offer_id: string) {
  return new Promise<{ data: any; status: number }>((res, _) => {
    res({ data: "mocked value", status: 200 });
  });
  return axiosBase.delete(`/offers?offer_id=${offer_id}`);
}
