import axios from "./axiosInstance";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

class ItemAPI {
  static async getItemsByCategory(mainCategory, subCategory, page) {
    try {
      // TODO: 카테고리 기능 구현, mainCategory기능이랑 subCategory기능 연결해 줘야함.
      const response = await axios.get(`${API_DOMAIN}/item/category`, {
        params: { mainCategory, subCategory, page },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ItemAPI;
