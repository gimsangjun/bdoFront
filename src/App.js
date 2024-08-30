import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import ReinforcementCalPage from "./pages/ReinforcementCalPage";
import ProcessiongTradePage from "./pages/ProcessiongTradePage";
import ItemListPage from "./pages/admin/ItemListPage";
import ItemDetailPage from "./pages/admin/ItemDetailPage";
import ItemCreatePage from "./pages/admin/ItemCreatePage";

export default function App() {
  return (
    <Routes>
      {/* 관리자 페이지 */}
      {/* 아이템 정보 수정 */}
      <Route path="/admin/item" element={<ItemListPage />} />
      <Route path="/admin/item/detail" element={<ItemDetailPage />} />
      <Route path="/admin/item/create" element={<ItemCreatePage />} />
      {/* 아이템 강화 계산기 */}
      <Route
        path="/reinforcement-caculator"
        element={<ReinforcementCalPage />}
      />
      {/* 가공 무역 */}
      <Route path="/processiong-trade" element={<ProcessiongTradePage />} />
      <Route path="/" element={<RootPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
