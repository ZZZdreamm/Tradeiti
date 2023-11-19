import { axiosBase } from "../config/axiosConfig";
import { UserCredentials } from "../models/UserCredentials";

export async function register(userCredentials: UserCredentials){
    const response = await axiosBase.post('/auth/register', userCredentials)
    console.log(response.data)
    return response.data
}