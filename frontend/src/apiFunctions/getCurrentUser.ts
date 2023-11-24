import { axiosBase } from "../config/axiosConfig";

export function getCurrentUser() {
  return axiosBase.get("/auth/test-token");
}
