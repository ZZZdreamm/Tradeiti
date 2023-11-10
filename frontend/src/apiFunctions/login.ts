import { axiosBase } from "../config/axiosConfig";

export async function getRequestToken(){
    const response = await axiosBase.get('/oauth/request-token')
    console.log(response.data)
    return response.data
}