import redDragon from "../images/red_dragon_3-removebg-preview.png";
import React from "react";
import SearchBar from "./SearchBar";
import BulletinBoard from "./BulletinBoard";
import TradeRank from "./TradeRank";

const MainSection = () => {
  return (
    // TODO: 옆으로 스크롤 하면 거기는 색깔이 적용안되어있음.
    <div className="bg-mainBlue w-full h-full">
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto w-1080 ">
        <div className="top-3">
          <img className="w-96 h-96 px-0" src={redDragon} alt="main" />
        </div>
        <SearchBar />
        <div className="flex flex-row w-1080 justify-between">
          <BulletinBoard />
          <TradeRank />
        </div>
      </div>
    </div>
  );
};

export default MainSection;
