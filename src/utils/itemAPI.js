import axios from "./axiosInstance";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

class ItemAPI {
  static async getItemsByCategory(mainCategory, subCategory, page) {
    const response = await axios.get(`${API_DOMAIN}/item/category`, {
      params: { mainCategory, subCategory, page },
    });
    return {
      status: response.status,
      items: response.data.items,
      totalCount: response.data.totalCount,
    };
  }

  static async getFavItem() {
    try {
      const response = await axios.get(`${API_DOMAIN}/item/favorite`);
      return { status: response.status, favItems: response.data.itemFavorites };
    } catch (error) {
      console.error("getItemFavorite Error", error);
      throw error;
    }
  }

  static async addFavItem(item) {
    try {
      const { id, sid } = item;
      const response = await axios.post(`${API_DOMAIN}/item/favorite`, {
        id,
        sid,
      });
      return { status: response.status };
    } catch (error) {
      console.error("addItemFavorite Error", error);
      throw error;
    }
  }

  static async removeFavItem(item) {
    try {
      const { id, sid } = item;
      const response = await axios.delete(`${API_DOMAIN}/item/favorite?id=${id}&sid=${sid}`);
      return { status: response.status };
    } catch (error) {
      console.error("remoeItemFavorite Error", error);
      throw error;
    }
  }
}

export default ItemAPI;
