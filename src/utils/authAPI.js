import axios from "./axiosInstance";

class AuthAPI {
  // 로그인 : header에서 redirect로 구현했기 때문에 필요없음.
  // GET /auth/logout
  static async logout() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // POST /auth/profile
  static async getProfile() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/profile`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthAPI;
