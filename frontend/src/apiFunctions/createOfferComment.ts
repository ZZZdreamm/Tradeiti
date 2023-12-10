import { axiosBase } from "../config/axiosConfig";
import { Comment } from "../models/Comment";

export function createOfferComment(comment: Comment) {
  return axiosBase.post("/comments/create", comment);
}
