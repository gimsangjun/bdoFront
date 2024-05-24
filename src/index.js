import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, legacy_createStore } from "redux";
import rootReducer from "./modules";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { fetchUserProfile } from "./modules/auth";
import { Provider } from "react-redux";

const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)),
);

// redux가 초기화되도(사용자 새로고침) 로그인 유지되게
store.dispatch(fetchUserProfile());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
