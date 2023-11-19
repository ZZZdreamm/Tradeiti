import { axiosBase } from "../config/axiosConfig";
import { UserCredentials } from "../models/UserCredentials";

export async function login(userCredentials: UserCredentials) {
  const response = await axiosBase.post("/auth/login", userCredentials);
  console.log(response.data);
  return response.data;
}
