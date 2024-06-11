import React, { useState } from "react";
import cronStone from "../../images/cronStone.png";
import ItemImg from "../item/ItemImg";
import { formatCost } from "../../utils/formatUtil";

export default function ItemsPerTry({
  items, // 아이템 이미지
  enhancingData,
  cronStonePrice,
  handleCronStonePrice,
  itemPricePerTry,
  handleItemPricePerTry,
  itemNamePerTry,
}) {
  const [editingCronStone, setEditingCronStone] = useState(false);
  const [editingItemPrice, setEditingItemPrice] = useState(false);

  const handleCronStoneBlur = () => {
    setEditingCronStone(false);
  };

  const handleItemPriceBlur = () => {
    setEditingItemPrice(false);
  };

  return (
    <div>
      <h1 className="text-2xl mb-2">아이템 재화 가격</h1>
      <div className="flex items-center mb-4">
        <img src={cronStone} alt="크론석" className="w-12 h-12 mr-2" />
        <div>
          <p className="ml-1">크론석</p>
          {editingCronStone ? (
            <input
              type="number"
              value={cronStonePrice}
              onChange={(e) => handleCronStonePrice(e.target.value)}
              onBlur={handleCronStoneBlur}
              className="border p-2 rounded"
              autoFocus
            />
          ) : (
            <p
              onClick={() => setEditingCronStone(true)}
              className="border p-2 rounded cursor-pointer w-32"
            >
              {formatCost(cronStonePrice)}
            </p>
          )}
        </div>
      </div>
      <div>
        {/* 강화에 소모되는 아이템 */}
        {/* 악세사리의 경우, 강화의 재료로 자기자신이 들어가기 떄문에 */}
        {/* TODO: 악세사리 제외 다른 아이템들의 경우 다른 강화재료가 들어감. 나중에 */}
        <div className="flex items-center mb-4">
          <ItemImg item={items[0]} />
          <div>
            <p className="ml-1">{itemNamePerTry}</p>

            {editingItemPrice ? (
              <input
                type="number"
                value={itemPricePerTry}
                onChange={(e) => handleItemPricePerTry(e.target.value)}
                onBlur={handleItemPriceBlur}
                className="border p-2 rounded"
                autoFocus
              />
            ) : (
              <p
                onClick={() => setEditingItemPrice(true)}
                className="border p-2 rounded cursor-pointer w-32"
              >
                {formatCost(itemPricePerTry)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
