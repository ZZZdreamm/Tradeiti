import { axiosBase } from "../config/axiosConfig";

export function createOfferComment(comment: Comment) {
    return axiosBase.post("/comments/create", comment);
}
