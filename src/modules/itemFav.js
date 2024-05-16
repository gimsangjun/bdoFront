import ItemAPI from "../utils/itemAPI";

// 액션 상태
export const FETCH_FAV_ITEM_START = "item/FETCH_FAV_ITEM_START";
export const FETCH_FAV_ITEM_SUCCESS = "item/FETCH_FAV_ITEM_SUCCESS";
export const FETCH_FAV_ITEM_FAILURE = "item/FETCH_FAV_ITEM_FAILURE";

// 액션 생성함수
// TODO, 액션생성함수를 이렇게 줄일수도 있다. get, update와 remove 모두 fetch로 가능.
const fetchFavItemsStart = () => ({
  type: FETCH_FAV_ITEM_START,
});

const fetchFavItemsSuccess = (status, favItems) => ({
  type: FETCH_FAV_ITEM_SUCCESS,
  payload: {
    status,
    favItems,
  },
});

const fetchFavItemsFailure = (status, error) => ({
  type: FETCH_FAV_ITEM_FAILURE,
  payload: {
    status,
    error,
  },
});

// 비동기 처리 redux-think
export const fetchFavoriteItems = () => async (dispatch) => {
  dispatch(fetchFavItemsStart());
  try {
    const { status, favItems } = await ItemAPI.getFavItem();
    dispatch(fetchFavItemsSuccess(status, favItems));
  } catch (error) {
    dispatch(fetchFavItemsFailure(error.response.status, error.message));
  }
};

export const addFavoriteItem = (item) => async (dispatch) => {
  dispatch(fetchFavItemsStart());
  try {
    const { status } = await ItemAPI.addFavItem(item);
    const { favItems } = await ItemAPI.getFavItem();
    dispatch(fetchFavItemsSuccess(status, favItems));
  } catch (error) {
    dispatch(fetchFavItemsFailure(error.response.status, error.message));
  }
};

export const removeFavoriteItem = (item) => async (dispatch) => {
  dispatch(fetchFavItemsStart());
  try {
    const { status } = await ItemAPI.removeFavItem(item);
    const { favItems } = await ItemAPI.getFavItem();
    dispatch(fetchFavItemsSuccess(status, favItems));
  } catch (error) {
    dispatch(fetchFavItemsFailure(error.response.status, error.message));
  }
};

// 초기값
const initialState = {
  loading: false,
  favItems: [],
  status: null,
  error: null,
};

export default function itemFav(state = initialState, action) {
  switch (action.type) {
    case FETCH_FAV_ITEM_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FAV_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        favItems: action.payload.favItems,
        status: action.payload.status,
      };
    case FETCH_FAV_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
