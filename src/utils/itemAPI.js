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
      console.error("getItemsByCategory Error", error);
      throw error;
    }
  }

  static async getItemFavorite() {
    try {
      const response = await axios.get(`${API_DOMAIN}/item/favorite`);
      const { username, itemFavorites } = response.data;
      return { username, favorites: itemFavorites };
    } catch (error) {
      console.error("getItemFavorite Error", error);
      throw error;
    }
  }

  static async setItemFavorite(item) {
    try {
      const { id, sid } = item;
      const response = await axios.post(`${API_DOMAIN}/item/favorite`, {
        id,
        sid,
      });
      const { username, itemFavorites } = response.data;
      return { username, favorites: itemFavorites };
    } catch (error) {
      console.error("setItemFavorite Error", error);
      throw error;
    }
  }

  // TODO: 다시 누르면 하트 사라지는 버튼도 만들어야됨.
}

export default ItemAPI;
