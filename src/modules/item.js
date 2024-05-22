import ItemAPI from "../utils/itemAPI";

// 액션 상태
export const FETCH_ITEM_START = "item/FETCH_ITEM_START";
export const FETCH_ITEM_SUCCESS = "item/FETCH_ITEM_SUCCESS";
export const FETCH_ITEM_FAILURE = "item/FETCH_ITEM_FAILURE";
export const UPDATE_ITEM_SUCCESS = "item/UPDATE_ITEM_SUCCESS";

// 액션 생성 함수
const fetchItemsStart = () => ({
  type: FETCH_ITEM_START,
});

const fetchItemsSuccess = (status, query, items, totalCount, pages, currentPage) => ({
  type: FETCH_ITEM_SUCCESS,
  payload: {
    status,
    query,
    items,
    totalCount,
    pages,
    currentPage,
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
export const getItemsByQuery = (query, _currentPage) => {
  return async (dispatch) => {
    dispatch(fetchItemsStart());
    console.log(query);
    try {
      const { status, items, totalCount, pages, currentPage } = await ItemAPI.getItemsByQuery(
        query,
        _currentPage
      );
      // status, query, items, totalCount, pages, currentPage
      dispatch(fetchItemsSuccess(status, query, items, totalCount, pages, currentPage));
    } catch (error) {
      console.log("아이템 검색 실패: ", error);
      const statusCode = error.response ? error.response.status : 500; // 상태 코드가 없는 경우 500으로 설정
      dispatch(fetchItemsFailure(statusCode, error));
    }
  };
};

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

// 초기 값
const initialState = {
  loading: false,
  items: [],
  query: {},
  pages: 0,
  currentPage: 1,
  totalCount: 0,
  status: null,
  error: null,
};

export default function item(state = initialState, action) {
  switch (action.type) {
    // TODO: 더 효율적으로 작성하는 방법이 벨로퍼트에 있었던거 같음.
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
        query: action.payload.query,
        totalCount: action.payload.totalCount,
        pages: action.payload.pages,
        currentPage: action.payload.currentPage,
      };
    case FETCH_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        items: [],
        query: action.payload.query,
        totalCount: 0,
        pages: 0,
        currentPage: 0,
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
    default:
      return state;
  }
}
