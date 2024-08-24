import React from "react";
import HeaderContainer from "../containers/HeaderContainer";
import ProcessingTradeContainer from "../containers/ProcessingTradeContainer";

// 가공 무역
export default function ProcessiongTradePage() {
  return (
    <div className="flex min-w-[1400px] min-h-screen flex-col bg-gray-200">
      <HeaderContainer />
      <ProcessingTradeContainer />
    </div>
  );
}
