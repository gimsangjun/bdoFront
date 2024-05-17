import ItemAPI from "../utils/itemAPI";

// 액션 상태
export const FETCH_ITEM_START = "item/FETCH_ITEM_START";
export const FETCH_ITEM_SUCCESS = "item/FETCH_ITEM_SUCCESS";
export const FETCH_ITEM_FAILURE = "item/FETCH_ITEM_FAILURE";
export const UPDATE_ITEM_SUCCESS = "item/UPDATE_ITEM_SUCCESS";
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

const updateItemsSuccess = (status, items) => ({
  type: UPDATE_ITEM_SUCCESS,
  payload: {
    status,
    items,
  },
});

const fetchItemsFailure = (status, error) => ({
  type: FETCH_ITEM_FAILURE,
  payload: {
    status,
    error,
  },
});

// 비동기 처리 redux-think
export const getItemByName = (name) => {
  return async (dispatch) => {
    dispatch(fetchItemsStart());
    try {
      const { status, items, totalCount } = await ItemAPI.getItemPricesByName(name);
      dispatch(fetchItemsSuccess(status, items, totalCount));
    } catch (error) {
      console.log("아이템 검색 실패: ", error);
      const statusCode = error.response ? error.response.status : 500; // 상태 코드가 없는 경우 500으로 설정
      dispatch(fetchItemsFailure(statusCode, error));
    }
  };
};

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
      const statusCode = error.response ? error.response.status : 500; // 상태 코드가 없는 경우 500으로 설정
      dispatch(fetchItemsFailure(statusCode, error));
    }
  };
};

// TODO: updateItem을 그냥 id,sid로만 업데이트하는걸로 바꿔야할듯.
export const updateItems = (name, items) => {
  return async (dispatch) => {
    dispatch(fetchItemsStart());
    try {
      const { status, updateItems } = await ItemAPI.updateItemByName(name);
      console.log(status, updateItems);

      if (updateItems && updateItems.length > 0) {
        // items 배열 내의 각 아이템을 검사하고 필요에 따라 업데이트
        const updatedItems = items.map((item) => {
          // updateItems에서 같은 id와 sid를 가진 아이템 찾기
          const update = updateItems.find(
            (uItem) => uItem.id === item.id && uItem.sid === item.sid
          );
          // 일치하는 아이템이 있으면 업데이트된 정보로 교체
          return update ? { ...item, ...update } : item;
        });
        // 결과로 업데이트된 아이템 목록을 리덕스 상태에 저장하거나 추가적인 액션을 디스패치
        dispatch(updateItemsSuccess(status, updatedItems)); // 업데이트된 아이템 목록으로 상태 업데이트
      }
    } catch (error) {
      console.error("Item update failed:", error);
      dispatch(fetchItemsFailure(error));
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
        items: [],
        totalCount: 0,
        status: action.payload.status,
        error: action.payload.error,
      };
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        items: action.payload.items,
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
