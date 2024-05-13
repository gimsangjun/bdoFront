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

  static async addItemFavorite(item) {
    try {
      const { id, sid } = item;
      const response = await axios.post(`${API_DOMAIN}/item/favorite`, {
        id,
        sid,
      });
      const { username, itemFavorites } = response.data;
      return { username, favorites: itemFavorites };
    } catch (error) {
      console.error("addItemFavorite Error", error);
      throw error;
    }
  }

  static async removeItemFavorite(item) {
    try {
      const { id, sid } = item;
      const response = await axios.delete(`${API_DOMAIN}/item/favorite?id=${id}&sid=${sid}`);
      const { username, itemFavorites } = response.data;
      return { username, favorites: itemFavorites };
    } catch (error) {
      console.error("remoeItemFavorite Error", error);
      throw error;
    }
  }
}

export default ItemAPI;
