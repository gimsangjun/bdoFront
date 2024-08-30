import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import ReinforcementCalPage from "./pages/ReinforcementCalPage";
import ProcessiongTradePage from "./pages/ProcessiongTradePage";
import ItemInfoListPage from "./pages/admin/ItemInfoListPage";
import ItemInfoDetailPage from "./pages/admin/ItemInfoDetailPage";
import ItemCreatePage from "./pages/admin/ItemCreatePage";

export default function App() {
  return (
    <Routes>
      {/* 관리자 페이지 */}
      {/* 아이템 정보 수정 */}
      <Route path="/admin/item-info-list" element={<ItemInfoListPage />} />
      {/* 바로 여기로 접근 못하게 해야됨 */}
      <Route path="/admin/item-info-detail" element={<ItemInfoDetailPage />} />
      <Route path="/admin/item-create" element={<ItemCreatePage />} />
      {/* 아이템 가격 알림. */}
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
