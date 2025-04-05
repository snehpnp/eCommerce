import axios from "axios";
import * as Config from "../../utils/Config";

export const fetchAllProducts = async () => {
    const res = await axios.get(`${BASE_URL}/products`);
    return res.data;
  };