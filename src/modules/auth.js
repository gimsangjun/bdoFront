// TODO: 나중에 redux-thunk으로 교체해보기, 이미 redux-thunk을 쓴거 같고, 이부분에 대해서 더 공부하고, 더 효율적이로 작성한 벨로퍼트 보고 리팩토링해보기
import authAPI from "../utils/authAPI";

// 액션 상태
export const LOGOUT = "auth/LOGOUT";
export const SET_PROFILE = "auth/SET_PROFILE";

export const logout = () => {
  return async (dispatch) => {
    try {
      await authAPI.logout();
      // 세션 정보 초기화
      dispatch({ type: LOGOUT }); // 쿠키값도 삭제
    } catch (error) {
      console.log("Logout 실패 : ", error);
    }
  };
};

// 비동기 처리, 아마 redux-thunk
// 쿠키값에 적혀진 sessionID를 들고, 사용자 정보 요청(ex username 등)
export const fetchUserProfile = (sessionID) => {
  return async (dispatch) => {
    try {
      // const response = await authAPI.getProfile(sessionID);
      // authAPI의 axios설정을 하면 자동을 쿠키값(sessionID) 넘어가서 위와같이 해줄 필요없음.
      const response = await authAPI.getProfile();
      if (!response.status === 200)
        throw new Error("Authentication check failed");
      dispatch({ type: SET_PROFILE, payload: { user: response.data.user } });
    } catch (error) {
      console.log("사용자 정보 가져오기 실패 : ", error);
      return null; // 로그인 상태가 아니거나 요청 실패
    }
  };
};

// 초기 값
const initialState = {
  user: null,
  loading: false,
  // sessionID: null, 쿠키에 저장되서 필요없음.
  status: null,
  error: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        sessionID: null,
        status: null,
        user: null,
      };
    default:
      return state;
  }
}
