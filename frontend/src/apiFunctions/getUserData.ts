import { axiosBase } from "../config/axiosConfig";
import { UserData } from "../models/UserData";

export function getUserData() {
  return new Promise<UserData>((resolve, _) => {
    resolve({ username: "", avatar: 1 });
  });
  // return axiosBase.get<UserData>(`/user/data`).then((response) => {
  //   return response.data;
  // });
}
