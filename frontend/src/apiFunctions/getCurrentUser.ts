import { axiosBase } from "../config/axiosConfig";
import { ACCESS_TOKEN } from "../config/constants";

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return axiosBase.get("/course-editions");
}
