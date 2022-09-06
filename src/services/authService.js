import axios from "axios";
import { URL_BASE } from "../utils/Config";

export const getAuthToken = async(credentials) => {

    // console.log(credentials);

    const res = await axios.post(`${URL_BASE}/auth/login`, credentials);
    // console.log(res);

    return res;
};