import axios from "axios";
import { API_LOGIN } from "../utils/Config";

export const getAuthToken = async (credentials) => {
    // console.log(credentials);
    let res = await axios.post(API_LOGIN, credentials);
    return res;
};