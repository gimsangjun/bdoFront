// axiosInstance.js 파일
import axios from "axios";

/**
 * notion - 로그인 기능
 * 링크 - https://whimsical-dugout-2c6.notion.site/ee7d2ffa9e564eaf8be134087b704a15?pvs=4
 */
// 새로운 axios 인스턴스 생성
const instance = axios.create({
  // 기본적으로 브라우저가 제공하는 요청 API 들은 별도의 옵션 없이 브라우저의 쿠키와 같은 인증과 관련된 데이터를 함부로 요청 데이터에 담지 않도록 되어있다.
  // 브라우저가 요청에 쿠키를 포함하도록 허용
  // axios 요청을 보낼 때 세션 ID를 가진 쿠키도 함께 보내기 위해 설정 객체를 만듦
  // 자동으로 쿠키값이 넘어감.
  withCredentials: true,
});

export default instance;
