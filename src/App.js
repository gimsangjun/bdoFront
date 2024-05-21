import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import ItemsPage from "./pages/ItemsPage";
import FavoritePage from "./pages/FavoritePage";

export default function App() {
  return (
    <Routes>
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/" element={<RootPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
