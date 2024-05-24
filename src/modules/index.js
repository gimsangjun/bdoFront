import { combineReducers } from "redux";
import auth from "./auth";
import item from "./item";
import itemFav from "./itemFav";
import priceAlert from "./priceAlert";

const rootReducer = combineReducers({ auth, item, itemFav, priceAlert });

export default rootReducer;
