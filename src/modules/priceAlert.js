import ItemAPI from "../utils/itemAPI";

// 액션 상태
export const FETCH_PRICE_ALERT_START = "item/FETCH_PRICE_ALERT_START";
export const FETCH_PRICE_ALERT_SUCCESS = "item/FETCH_PRICE_ALERT_SUCCESS";
export const FETCH_PRICE_ALERT_FAILURE = "item/FETCH_PRICE_ALERT_FAILURE";

// 액션 생성함수
const fetchPriceAlertsStart = () => ({
  type: FETCH_PRICE_ALERT_START,
});

const fetchPriceAlertsSuccess = (status, priceAlerts) => ({
  type: FETCH_PRICE_ALERT_SUCCESS,
  payload: {
    status,
    priceAlerts,
  },
});

const fetchPriceAlertsFailure = (status, error) => ({
  type: FETCH_PRICE_ALERT_FAILURE,
  payload: {
    status,
    error,
  },
});

// 비동기 처리 redux-thunk
export const fetchPriceAlerts = () => async (dispatch) => {
  dispatch(fetchPriceAlertsStart());
  try {
    const { status, itemPriceAlerts } = await ItemAPI.getItemPriceAlerts();
    dispatch(fetchPriceAlertsSuccess(status, itemPriceAlerts));
  } catch (error) {
    dispatch(fetchPriceAlertsFailure(error.response?.status, error.message));
  }
};

export const addPriceAlert = (alert) => async (dispatch) => {
  dispatch(fetchPriceAlertsStart());
  try {
    const { status } = await ItemAPI.addItemPriceAlert(alert);
    const { itemPriceAlerts } = await ItemAPI.getItemPriceAlerts();
    console.log("itemPriceAlerts", itemPriceAlerts);
    dispatch(fetchPriceAlertsSuccess(status, itemPriceAlerts));
  } catch (error) {
    dispatch(fetchPriceAlertsFailure(error.response?.status, error.message));
  }
};

export const updatePriceAlert = (alert) => async (dispatch) => {
  dispatch(fetchPriceAlertsStart());
  try {
    const { status } = await ItemAPI.updateItemPriceAlert(alert);
    const { itemPriceAlerts } = await ItemAPI.getItemPriceAlerts();
    dispatch(fetchPriceAlertsSuccess(status, itemPriceAlerts));
  } catch (error) {
    dispatch(fetchPriceAlertsFailure(error.response?.status, error.message));
  }
};

export const removePriceAlert = (alertId) => async (dispatch) => {
  dispatch(fetchPriceAlertsStart());
  try {
    const { status } = await ItemAPI.deleteItemPriceAlert(alertId);
    const { itemPriceAlerts } = await ItemAPI.getItemPriceAlerts();
    dispatch(fetchPriceAlertsSuccess(status, itemPriceAlerts));
  } catch (error) {
    dispatch(fetchPriceAlertsFailure(error.response?.status, error.message));
  }
};

// 초기값
const initialState = {
  loading: false,
  priceAlerts: [],
  status: null,
  error: null,
};

export default function itemPriceAlert(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRICE_ALERT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRICE_ALERT_SUCCESS:
      return {
        ...state,
        loading: false,
        priceAlerts: action.payload.priceAlerts,
        status: action.payload.status,
      };
    case FETCH_PRICE_ALERT_FAILURE:
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
