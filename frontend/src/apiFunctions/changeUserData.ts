import { axiosBase } from "../config/axiosConfig";
import { UserData } from "../models/UserData";

export function changeUserData(userData: UserData){
    return axiosBase.put("/user/change-data", userData);
}