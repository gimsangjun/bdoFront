import redDragon from "../images/red_dragon_3-removebg-preview.png";
import React from "react";
import SearchBar from "./SearchBar";
import BulletinBoard from "./BulletinBoard";
import TradeRank from "./TradeRank";

const MainSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto w-1080">
      <div className="top-3">
        <img className="w-96 h-96 px-0" src={redDragon} alt="main" />
      </div>
      <SearchBar />
      <div className="flex flex-row w-1080 justify-between">
        <BulletinBoard />
        <TradeRank />
      </div>
    </div>
  );
};

export default MainSection;
