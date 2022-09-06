import axios from "axios";
import { URL_BASE } from "../utils/Config";

export const getProducts = async () => {
  const { token } = JSON.parse(localStorage.token);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let res = await axios.get(`${URL_BASE}/product`, config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  const { token } = JSON.parse(localStorage.token);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let res = await axios.get(`${URL_BASE}/product/${id}`, config);
    return res;
  } catch (error) {
    throw error;
  }
};
