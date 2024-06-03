import React from "react";
import HeaderContainer from "../containers/HeaderContainer";
import PriceAlertContainer from "../containers/PriceAlertContainer";

export default function PriceAlertPage() {
  return (
    <div className="flex min-w-[1080px] min-h-screen flex-col bg-gray-200 ">
      <HeaderContainer />
      <PriceAlertContainer />
    </div>
  );
}
