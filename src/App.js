import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import ItemsPage from "./pages/ItemsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RootPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
