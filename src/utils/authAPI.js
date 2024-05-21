import axios from "./axiosInstance";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

class AuthAPI {
  // 로그인 : header에서 redirect로 구현했기 때문에 필요없음.

  // GET /auth/logout
  static async logout() {
    try {
      const response = await axios.get(`${API_DOMAIN}/auth/logout`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // POST /auth/profile
  static async getProfile() {
    try {
      const response = await axios.get(`${API_DOMAIN}/auth/profile`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthAPI;
