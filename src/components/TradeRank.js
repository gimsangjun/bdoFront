// TradeVolumeRanking.jsx
import React from "react";

const TradeRank = () => {
  const rankings = [
    { name: "Coin A", volume: "5,000" },
    { name: "Coin B", volume: "4,500" },
    { name: "Coin C", volume: "4,000" },
    { name: "Coin D", volume: "3,500" },
  ];

  return (
    <div className="my-4 p-4 bg-white rounded-lg shadow-md w-536">
      <h3 className="text-xl font-semibold mb-2">거래량 순위</h3>
      <ul>
        {rankings.map((rank, index) => (
          <li key={index} className="flex justify-between border-b last:border-b-0 py-2">
            <span>{rank.name}</span>
            <span>{rank.volume}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeRank;
