// import { axiosBase } from "../config/axiosConfig";
import { apiBaseUrl } from "../config/axiosConfig";
import { JWT_TOKEN } from "../config/constants";

export async function connectUsos() {
  // return axiosBase
  //   .get(
  //     "/usos/connect"
  //     // , {
  //     //   headers: {
  //     //     Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
  //     //   },
  //     // }
  //   )
  //   .then((response) => {
  //     console.log(response.data);
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // console.log(response.data);
  // return response.data;
  return fetch(`${apiBaseUrl}/usos/connect`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
    },
  }).then((response) => {
    return response.text();
  });
}
