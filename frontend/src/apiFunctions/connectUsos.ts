// import { axiosBase } from "../config/axiosConfig";
import { axiosBase } from "../config/axiosConfig";

export async function connectUsos() {
  return axiosBase.get(`/usos/connect`).then((response) => {
    if (response.status > 400) {
      throw new Error("Failed to connect to USOS");
    }
    return response.data;
  });
}
