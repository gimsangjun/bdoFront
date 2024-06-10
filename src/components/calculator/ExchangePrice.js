import React from "react";
import ItemImg from "../item/ItemImg";
import { formatCost } from "./EnhanceTable";
import { formatDate } from "../item/ItemsTable";

const ExchangePrice = ({ items }) => {
  return (
    <>
      <h1 className="text-2xl mb-2">거래소 가격</h1>
      <div>
        {items.map((item) => (
          <div key={item.sid} className="flex items-center mb-4">
            <ItemImg item={item} />
            <div>
              <p className="text-lg font-semibold">
                {getEnhancedItemName(item)}
              </p>
              <p>
                {formatCost(
                  item.lastSoldPrice ? item.lastSoldPrice : item.basePrice,
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div>가격업데이트 날짜</div>
        <span>{formatDate(items[0].updateAt)}</span>
        {/* TODO: 가격 업데이트하는 버튼 만들어야됨. */}
      </div>
    </>
  );
};

// 강화단계에 따라 item.name,장: item.name, 광: item.name, 고 , 유, 동
const getEnhancedItemName = (item) => {
  const enhancementStages = {
    1: "장",
    2: "광",
    3: "고",
    4: "유",
    5: "동",
    16: "장",
    17: "광",
    18: "고",
    19: "유",
    20: "동",
  };

  const stage = enhancementStages[item.sid];
  return stage ? `${stage}: ${item.name}` : item.name;
};

export default ExchangePrice;
