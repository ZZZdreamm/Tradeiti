import { axiosBase } from "../config/axiosConfig";

export function rejectOffer(offer_id: string) {
    return new Promise((res, _) => {
        res({ data: "mocked value" });
    });
    return axiosBase.patch(`/offers/reject?offer_id=${offer_id}`)
}