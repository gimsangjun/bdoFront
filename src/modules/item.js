import ItemAPI from "../utils/itemAPI";

// 액션 상태
export const FETCH_ITEM_START = "item/FETCH_ITEM_START";
export const FETCH_ITEM_SUCCESS = "item/FETCH_ITEM_SUCCESS";
export const FETCH_ITEM_FAILURE = "item/FETCH_ITEM_FAILURE";
export const GET_ITEMS = "item/GET_ITEMS";
export const SET_CATEGORY = "item/SET_CATEGORY";

// 액션 생성 함수
const fetchItemsStart = () => ({
  type: FETCH_ITEM_START,
});

const fetchItemsSuccess = (status, items, totalCount) => ({
  type: FETCH_ITEM_SUCCESS,
  payload: {
    status,
    items,
    totalCount,
  },
});

const fetchItemsFailure = (status, error) => ({
  type: FETCH_ITEM_FAILURE,
  paylaod: {
    status,
    error,
  },
});

// 비동기 처리 redux-think
export const getItems = (mainCategory, subCategory, page) => {
  // TODO: dispatch가 어디서 나온지 모르겠음.
  return async (dispatch) => {
    dispatch(fetchItemsStart());
    try {
      const { status, items, totalCount } = await ItemAPI.getItemsByCategory(
        mainCategory,
        subCategory,
        page
      );
      dispatch(fetchItemsSuccess(status, items, totalCount));
    } catch (error) {
      console.log("아이템 가져오기 실패: ", error);
      dispatch(fetchItemsFailure(error.response.status, error));
    }
  };
};

export const setCategory = (mainCategory, subCategory) => ({
  type: SET_CATEGORY,
  payload: {
    mainCategory,
    subCategory,
  },
});

// 초기 값
const initialState = {
  loading: false,
  items: [],
  totalCount: 0,
  status: null,
  error: null,
  mainCategory: 0,
  subCategory: 0,
};

export default function item(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        items: action.payload.items,
        totalCount: action.payload.totalCount,
      };
    case FETCH_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        error: action.payload.error,
      };
    case SET_CATEGORY:
      return {
        ...state,
        mainCategory: action.payload.mainCategory,
        subCategory: action.payload.subCategory,
      };
    default:
      return state;
  }
}
