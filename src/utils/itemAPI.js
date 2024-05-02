import axios from "./axiosInstance";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

class ItemAPI {
  static async getItemsByPage(page) {
    try {
      // response타입이 Promise이로 나옴 -> await를 안붙여줬음.
      const response = await axios.post(`${API_DOMAIN}/item/page`, { page });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ItemAPI;
