
import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const getProducts = async (category) => {
  const url = category && category !== "all" ? `${API_URL}/category/${category}` : API_URL;
  const response = await axios.get(url);
  return response.data;
};
