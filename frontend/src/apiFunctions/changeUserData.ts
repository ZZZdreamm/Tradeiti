import { axiosBase } from "../config/axiosConfig";
import { UserData } from "../models/UserData";

export function changeUserData(userData: UserData){
    return axiosBase.put("/user/change-data", userData);
}

export async function changeUserLogin(userLogin: string){
    const response = await axiosBase.post("/user/change-username", userLogin);
    console.log(response.data);
    return response.data;
}

export async function changeUserAvatar(userAvatar: string){
    const response = await axiosBase.post("/user/change-avatar", userAvatar);
    console.log(response.data);
    return response.data;
}