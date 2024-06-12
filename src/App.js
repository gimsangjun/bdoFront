import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import AllItemsPage from "./pages/AllItemsPage";
import FavoritePage from "./pages/FavoritePage";
import PriceAlertPage from "./pages/PriceAlertPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFavoriteItems } from "./modules/itemFav";
import ReinforcementCalPage from "./pages/ReinforcementCalPage";

export default function App() {
  // 로그인한 유저가 있으면 favItems 로드
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // TODO: 여기를 거치지않고, 바로 특정페이지로 가는 경우 문제가 생기는듯. => 해결 방법 찾아야됨.
  useEffect(() => {
    if (user) {
      dispatch(fetchFavoriteItems());
    }
  }, [dispatch, user]);

  return (
    <Routes>
      {/* 아이템 가격 알림. */}
      <Route
        path="/reinforcement-caculator"
        element={<ReinforcementCalPage />}
      />
      <Route path="/price-alert" element={<PriceAlertPage />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="/items" element={<AllItemsPage />} />
      <Route path="/" element={<RootPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
