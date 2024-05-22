import axios from "./axiosInstance";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

class ItemAPI {
  static async getItemsByQuery(query, page = 1) {
    try {
      const response = await axios.post(`${API_DOMAIN}/item/`, {
        query,
        page,
      });
      const { items, totalCount, pages, currentPage } = response.data;
      return { status: response.status, items, totalCount, pages, currentPage };
    } catch (error) {
      console.error("getItemsByQuery Error:", error);
      throw error;
    }
  }

  static async updateItemByName(name) {
    const response = await axios.post(`${API_DOMAIN}/item/update`, {
      name,
    });
    return { status: response.status, updateItems: response.data.items };
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
