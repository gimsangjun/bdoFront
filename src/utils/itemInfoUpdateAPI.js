import axios from "./axiosInstance";

// 관리자 페이지에서 아이템 정보를 쉽게 수정하기 위함.
class ItemInfoUpdateAPI {
  // GET: 아이템 정보를 쿼리에 따라 가져오기
  // 쿼리가능 : id,name, page,limit
  // 응답
  // response = {
  //   currentPage: 1,
  //   items: [],
  //   totalItems: 1,
  //   totalPages: 1,
  // };
  static async getItems(query) {
    try {
      const queryString = new URLSearchParams(query).toString();
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/item?${queryString}`,
      );
      return response.data;
    } catch (error) {
      console.error("getItems Error:", error);
      throw error;
    }
  }

  // POST: 새로운 아이템을 생성
  static async createItem(data) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/item`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("createItem Error:", error);
      throw error;
    }
  }

  // PATCH: 기존 아이템 정보 업데이트
  static async updateItem(data) {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/item`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("updateItem Error:", error);
      throw error;
    }
  }

  // DELETE: 아이템 삭제
  static async deleteItem(data) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/item`,
        { data },
      );
      return response.data;
    } catch (error) {
      console.error("deleteItem Error:", error);
      throw error;
    }
  }
}

export default ItemInfoUpdateAPI;
