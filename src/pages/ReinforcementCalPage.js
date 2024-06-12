import React from "react";
import HeaderContainer from "../containers/HeaderContainer";
import ReinforcementContainer from "../containers/ReinforcementContainer";

export default function ReinforcementCalPage() {
  return (
    <div className="flex min-w-[1400px] min-h-screen flex-col bg-gray-200">
      <HeaderContainer />
      <ReinforcementContainer itemName={"데보레카 허리띠"} />
    </div>
  );
}
