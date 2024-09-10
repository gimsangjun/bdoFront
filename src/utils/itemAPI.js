import axios from "./axiosInstance";

class ItemAPI {
  //
  // 아이템 가져오기
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
      const { items, totalItemsCount, totalPages, currentPage } = response.data;

      return {
        status: response.status,
        items,
        totalItemsCount,
        totalPages,
        currentPage,
      };
    } catch (error) {
      console.error("getItemsByQuery Error:", error);
      throw error;
    }
  }

  /**
   * 아이템의 ID와 SID를 사용하여 아이템을 조회합니다. ID 배열이나 ID와 SID를 포함한 객체 배열을 모두 수용
   * @param {Array<number>|Array<object>} items - 아이템 ID의 배열 또는 ID와 SID를 포함한 객체 배열.
   * @returns {Promise<Array>} 조회된 아이템 배열.
   */
  static async getItemsByIdandSid(items) {
    try {
      // 입력된 items가 숫자 배열인지 객체 배열인지 판별하고 적절하게 형태를 변환
      const formattedItems = items.map((item) => {
        if (typeof item === "number") {
          // 숫자 배열의 경우, sid를 0으로 기본 설정
          return { id: item, sid: 0 };
        } else if (typeof item === "object" && item.id) {
          // 객체가 id와 sid를 이미 포함하고 있는 경우
          return { id: item.id, sid: item.sid ?? 0 }; // sid가 없는 경우 기본값으로 0을 설정
        }
        throw new Error(
          "항목 형식이 유효하지 않습니다. 항목은 숫자이거나 id를 반드시 포함해야 하며, 선택적으로 sid를 포함할 수 있습니다.",
        );
      });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/item/id-and-sid`,
        { items: formattedItems },
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

  // 관리자만
  static async createItem(data) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/item`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("createItem Error:", error);
      throw error;
    }
  }

  // 괸리자만, 기존 아이템 정보 업데이트
  static async updateItem(data) {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/item`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("updateItem Error:", error);
      throw error;
    }
  }

  // 관리자만, DELETE: 아이템 삭제
  static async deleteItem(data) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/item`,
        { data },
      );
      return response.data;
    } catch (error) {
      console.error("deleteItem Error:", error);
      throw error;
    }
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
