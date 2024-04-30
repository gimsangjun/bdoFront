import axios from "./axiosInstance";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

class AuthAPI {
  // POST /auth/login
  static async login(username, password) {
    try {
      const response = await axios.post(`${API_DOMAIN}/auth/login`, { username, password });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // POST /auth/signup
  static async signUp(username, password) {
    try {
      const response = await axios.post(`${API_DOMAIN}/auth/signup`, { username, password });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // GET /auth/login
  // static async logout() {
  //   try {
  //     await axios.get(`${API_DOMAIN}/auth/logout`);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // POST /auth/profile
  static async getProfile() {
    try {
      const response = await axios.get(`${API_DOMAIN}/auth/profile`);
      console.log("getProfile : ", response);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthAPI;
