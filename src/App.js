import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import ItemsPage from "./pages/ItemsPage";
import FavoritePage from "./pages/FavoritePage";
import ItemPriceAlertPage from "./pages/ItemPriceAlertPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFavoriteItems } from "./modules/itemFav";

export default function App() {
  // 로그인한 유저가 있으면 favItems 로드
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) dispatch(fetchFavoriteItems());
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/price-alert" element={<ItemPriceAlertPage />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/" element={<RootPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
