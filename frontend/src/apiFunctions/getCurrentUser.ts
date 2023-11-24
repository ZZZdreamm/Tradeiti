import { apiBaseUrl, axiosBase } from "../config/axiosConfig";
import { JWT_TOKEN } from "../config/constants";

export function getCurrentUser() {
  // return axiosBase.get("/auth/test-token");
  return fetch(`${apiBaseUrl}/auth/test-token`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
    },
  }).then((response) => {
    return response.text();
  });
}
