import axios from "./axiosInstance";

class ItemAPI {
  //
  // 아이템
  static async getItemsByQuery(queryParams, page = 1, limit = 10) {
    try {
      // 서버 URL과 쿼리 파라미터 구성
      const { id, sid, name, mainCategory } = queryParams;
      const params = new URLSearchParams({
        ...(id && { id }),
        ...(sid && { sid }),
        ...(name && { name }),
        ...(mainCategory && { mainCategory }),
        page,
        limit,
      });

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/item/?${params.toString()}`,
      );
      const { items, totalItems, totalPages, currentPage } = response.data;
      console.log("items:", items);

      return {
        status: response.status,
        items,
        totalCount: totalItems,
        pages: totalPages,
        currentPage,
      };
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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/item/id-and-sid`,
        {
          items,
        },
      );
      return response.data.items;
    } catch (error) {
      console.error("getItemsByIdandSid Error:", error);
      throw error;
    }
  }

  static async updateItemsPrice(items) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/item/update`,
      {
        items,
      },
    );
    return { status: response.status, updateItems: response.data.items };
  }

  // 강화 정보 가져오기
  static async getReinforcementInfo(type) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reinforcement`,
        {
          type,
        },
      );
      return response.data;
    } catch (error) {
      console.error("getReinforcementInfo Error", error);
      throw error;
    }
  }
}

export default ItemAPI;
