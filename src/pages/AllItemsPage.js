import React from "react";
import HeaderContainer from "../containers/HeaderContainer";
import AllItemsContainer from "../containers/AllItemsContainer";

export default function AllItemsPage() {
  return (
    <div className="flex min-w-[1080px] min-h-screen flex-col bg-gray-200">
      <HeaderContainer />
      <AllItemsContainer />
    </div>
  );
}
