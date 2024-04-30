// axiosInstance.js 파일
import axios from "axios";

// 새로운 axios 인스턴스 생성
const instance = axios.create({
  // 브라우저가 요청에 쿠키를 포함하도록 허용
  // axios 요청을 보낼 때 세션 ID를 가진 쿠키도 함께 보내기 위해 설정 객체를 만듦
  // 자동으로 쿠키값이 넘어감.
  withCredentials: true,
});

export default instance;
