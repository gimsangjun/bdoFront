import React, { useState } from "react";
import ItemImg from "../item/ItemImg";
import { formatCost, formatDate } from "../../utils/formatUtil";
import { LuRefreshCcw } from "react-icons/lu";
import ItemAPI from "../../utils/itemAPI";

const ExchangePrice = ({ items, handleItemsPrice, setItems }) => {
  const [prices, setPrices] = useState(
    items.map((item) =>
      item.lastSoldPrice ? item.lastSoldPrice : item.basePrice,
    ),
  );

  const [editingIndex, setEditingIndex] = useState(null);

  const handlePriceChange = (e, index) => {
    const newPrices = [...prices];
    newPrices[index] = e.target.value;
    setPrices(newPrices);
    handleItemsPrice(newPrices);
  };

  const handleBlur = () => {
    setEditingIndex(null);
  };

  const handleFocus = (index) => {
    setEditingIndex(index);
  };

  const handleUpdate = async () => {
    const { updateItems } = await ItemAPI.updateItemsPrice(items);
    setItems(updateItems);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-2">거래소 가격</h1>
        <div className="flex flex-col">
          <div className="flex">
            <div className="text-sm text-gray-600">업데이트 날짜</div>
            <LuRefreshCcw
              className="cursor-pointer pl-1 text-lg"
              onClick={handleUpdate}
            />
          </div>
          <span className="text-sm text-gray-600">
            {formatDate(items[0].updateAt)}
          </span>
        </div>
      </div>
      <div>
        {items.map((item, index) => (
          <div key={item.sid} className="flex items-center mb-4">
            <ItemImg item={item} />
            <div>
              <p className="text-lg font-semibold">
                {getEnhancedItemName(item)}
              </p>
              {editingIndex === index ? (
                <input
                  type="number"
                  value={prices[index]}
                  onChange={(e) => handlePriceChange(e, index)}
                  onBlur={handleBlur}
                  className="border p-2 rounded"
                  autoFocus
                />
              ) : (
                <p
                  onClick={() => handleFocus(index)}
                  className="border p-2 rounded cursor-pointer"
                >
                  {formatCost(parseInt(prices[index], 10))}
                </p>
              )}
            </div>
          </div>
        ))}
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
