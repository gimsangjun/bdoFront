import React from "react";
import HeaderContainer from "../containers/HeaderContainer";
import EnCalContainer from "../containers/EnCalContainer";

export default function EnhancingCalPage() {
  return (
    <div className="flex min-w-[1080px] min-h-screen flex-col bg-gray-200">
      <HeaderContainer />
      <EnCalContainer itemName={"데보레카 목걸이"} />
    </div>
  );
}
