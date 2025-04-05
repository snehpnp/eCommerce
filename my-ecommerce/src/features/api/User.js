import axios from "axios";
import * as Config from "../../utils/Config";

export const fetchAllProducts = async (data) => {
  
    const { Filter } = data;

    const response = await axios.get(`${Config.react_domain}/api/products`, {
        params: Filter,
      });
    return response.data;
  };