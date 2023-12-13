import { axiosBase } from "../config/axiosConfig";
import { UserData } from "../models/UserData";

// Request to backend endpoint which changes both username and avatar
export function changeUserData(userData: UserData){
    return axiosBase.put("/user/change-data", userData);
}

// Request to backend endpoint which changes username
export async function changeUserLogin(userLogin: string){
    const response = await axiosBase.post("/user/change-username", userLogin);
    console.log(response.data);
    return response.data;
}

// Request to backend endpoint which changes avatar
export async function changeUserAvatar(userAvatar: string){
    const response = await axiosBase.post("/user/change-avatar", userAvatar);
    console.log(response.data);
    return response.data;
}