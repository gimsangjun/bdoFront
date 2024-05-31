import React from "react";
import HeaderContainer from "../containers/HeaderContainer";
import FavItemsContainer from "../containers/FavItemsContainer";

export default function FavoritePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-200">
      <HeaderContainer />
      <FavItemsContainer />
    </div>
  );
}
