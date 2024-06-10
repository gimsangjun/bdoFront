import React from "react";
import cronStone from "../../images/cronStone.png";
import ItemImg from "../item/ItemImg";

export default function ItemsPerTry({
  items, // 아이템 이미지
  enhancingData,
  cronStonePrice,
  handleCronStonePrice,
  itemPricePerTry,
  handleItemPricePerTry,
  itemNamePerTry,
}) {
  return (
    <div>
      <h1 className="text-2xl mb-2">아이템 재화 가격</h1>
      <div className="flex items-center mb-4">
        <img src={cronStone} alt="크론석" className="w-12 h-12 mr-2" />
        <div>
          <p className="ml-1">크론석</p>
          <input
            type="number"
            value={cronStonePrice}
            onChange={(e) => handleCronStonePrice(e.target.value)}
            className="border p-2 rounded"
          />
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
            <input
              type="number"
              value={itemPricePerTry}
              onChange={(e) => handleItemPricePerTry(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
