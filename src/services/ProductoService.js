import axios from "axios";
import { API_PRODUCTS } from "../utils/Config";

export const getProducts = async () => {
    try {
      let res = await axios.get(API_PRODUCTS);
        return res;  
    } catch (error) {
        throw error;
    }
};