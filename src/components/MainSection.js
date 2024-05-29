import redDragon from "../images/red_dragon_3-removebg-preview.png";
import React from "react";
import SearchBar from "./SearchBar";
import BulletinBoard from "./BulletinBoard";
import TradeRank from "./TradeRank";

const MainSection = ({ onSearch }) => {
  return (
    /**
     * viewport의 크기가 아래 w-1080으로 크기를 지정해준 <div className="flex flex-row w-1080 justify-between">보다 작을때,
     * 부모 요소가 자식 요소의 크기에 따라 자동으로 확장되지 않아서 배경색깔이 제대로 적용이 안됨
     * => 부모한테 최소크기를 지정해주면됨. min-w-[1080px]
     * [] => JIT(Just In Time)이라는 것으로, tailwindcss 커스텀을 []로 간단하게 바로 할수 있는 기능.
     */

    <div className="bg-mainBlue h-full min-w-[1080px]">
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto w-1080 ">
        <div className="top-3">
          <img className="w-96 h-96 px-0" src={redDragon} alt="main" />
        </div>
        <SearchBar onSearch={onSearch} />
        <div className="flex flex-row w-1080 justify-between">
          <BulletinBoard />
          <TradeRank />
        </div>
      </div>
    </div>
  );
};

export default MainSection;
