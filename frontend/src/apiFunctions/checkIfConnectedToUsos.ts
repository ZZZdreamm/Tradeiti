// import { axiosBase } from "../config/axiosConfig";

export function checkIfConnectedToUsos() {
  //   return axiosBase.get("/usos/check-connection");
  return new Promise((resolve, _) => {
    // reject("Not implemented");
    resolve(true);
  });
}
