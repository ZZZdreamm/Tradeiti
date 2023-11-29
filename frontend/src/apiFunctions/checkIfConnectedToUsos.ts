import { axiosBase } from "../config/axiosConfig";
import { JWT_TOKEN } from "../config/constants";

export function checkIfConnectedToUsos() {
  return axiosBase
    .get(`/usos/check-connection`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    })
    .then((response) => {
      if (response.status > 400) {
        throw new Error("Not connected to USOS");
      }
      return response.data;
    });
}
