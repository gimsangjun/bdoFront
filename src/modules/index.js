import { combineReducers } from "redux";
import auth from "./auth";
import item from "./item";
import itemFav from "./itemFav";

const rootReducer = combineReducers({ auth, item, itemFav });

export default rootReducer;
