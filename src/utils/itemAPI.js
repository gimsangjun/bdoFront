import axios from "./axiosInstance";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

class ItemAPI {
  // 아이템
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

  /**
   *
   * @param {items} [{id, sid}]
   * @returns items
   */
  static async getItemsByIdandSid(items) {
    try {
      const response = await axios.post(`${API_DOMAIN}/item/id-and-sid`, {
        items,
      });
      return response.data.items;
    } catch (error) {
      console.error("getItemsByIdandSid Error:", error);
      throw error;
    }
  }

  static async updateItemsPrice(items) {
    const response = await axios.post(`${API_DOMAIN}/item/update`, {
      items,
    });
    return { status: response.status, updateItems: response.data.items };
  }

  // 즐겨찾기
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
      const response = await axios.delete(
        `${API_DOMAIN}/item/favorite?id=${id}&sid=${sid}`,
      );
      return { status: response.status };
    } catch (error) {
      console.error("remoeItemFavorite Error", error);
      throw error;
    }
  }

  // 가격 알림
  static async addItemPriceAlert(item, priceThreshold) {
    try {
      const response = await axios.post(`${API_DOMAIN}/item/alert`, {
        itemName: item.name,
        itemId: item.id,
        itemSid: item.sid,
        priceThreshold,
      });
      return {
        status: response.status,
        itemPriceAlert: response.data.itemPriceAlert,
      };
    } catch (error) {
      console.error("addItemPriceAlert Error", error);
      throw error;
    }
  }

  static async getItemPriceAlerts() {
    try {
      const response = await axios.get(`${API_DOMAIN}/item/alert`);
      return {
        status: response.status,
        itemPriceAlerts: response.data.itemPriceAlerts,
      };
    } catch (error) {
      console.error("getItemPriceAlerts Error", error);
      throw error;
    }
  }

  static async updateItemPriceAlert(alertId, priceThreshold) {
    try {
      const response = await axios.put(`${API_DOMAIN}/item/alert`, {
        alertId,
        priceThreshold,
      });
      return {
        status: response.status,
        itemPriceAlert: response.data.itemPriceAlert,
      };
    } catch (error) {
      console.error("updateItemPriceAlert Error", error);
      throw error;
    }
  }

  static async deleteItemPriceAlert(alertId) {
    try {
      const response = await axios.delete(
        `${API_DOMAIN}/item/alert?id=${alertId}`,
      );
      return { status: response.status };
    } catch (error) {
      console.error("deleteItemPriceAlert Error", error);
      throw error;
    }
  }

  // 강화 정보 가져오기
  static async getReinforcementInfo(type) {
    try {
      const response = await axios.post(`${API_DOMAIN}/reinforcement`, {
        type,
      });
      return response.data;
    } catch (error) {
      console.error("getReinforcementInfo Error", error);
      throw error;
    }
  }
}

export default ItemAPI;
