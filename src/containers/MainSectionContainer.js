import React from "react";
import MainSection from "../components/MainSection";
import { useNavigate } from "react-router-dom";

export default function MainSectionContainer() {
  const navigate = useNavigate();

  const handleSearch = (value) => {
    navigate(`/items?item_search_value=${value}`);
  };

  return <MainSection onSearch={handleSearch} />;
}
