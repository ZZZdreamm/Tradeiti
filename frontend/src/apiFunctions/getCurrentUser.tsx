// import { axiosBase } from "../config/axiosConfig";
// import { ACCESS_TOKEN } from "../config/constants";

export function getCurrentUser() {
  //   if (!localStorage.getItem(ACCESS_TOKEN)) {
  //     return Promise.reject("No access token set.");
  //   }
  return new Promise<{ data: any }>((res, _) => {
    res({ data: "mocked value" });
  });
  //   return axiosBase.get("/user/me", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
  //     },
  //   });
}
