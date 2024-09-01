import React, { useState, useEffect } from "react";
import ItemImg from "../ItemImg";
import { formatCost, formatDate } from "../../utils/formatUtil";
import { LuRefreshCcw } from "react-icons/lu";

// 강화 기댓값 계산기 - 거래소 가격
const ExchangePrice = ({
  items,
  handleItemsPrice,
  setItems,
  handleUpdateItemsPrice,
}) => {
  const [prices, setPrices] = useState([]);

  // items가 바뀔 때마다 prices를 업데이트
  useEffect(() => {
    const initialPrices = items.map(
      (item) =>
        // item.lastSoldPrice ? item.lastSoldPrice : item.basePrice,
        item.price,
    );
    setPrices(initialPrices);
  }, [items]);

  // 가격 수정 중인 아이템 인덱스를 저장, `null`이면 편집이 활성화되지 않은 상태임
  // 수정중이지 않는 아이템의 가격들은 억,만,원 단위로 표시가 되기 때문에, 수정할 때는 모든 숫자를 보여줘야하기때문.
  const [editingIndex, setEditingIndex] = useState(null);

  const handlePriceChange = (e, index) => {
    const newPrices = [...prices];
    newPrices[index] = e.target.value;
    setPrices(newPrices);
    handleItemsPrice(newPrices);
  };

  const handleBlur = () => {
    setEditingIndex(null); // 입력 포커스를 잃었을 때 편집 상태를 종료
  };

  const handleFocus = (index) => {
    setEditingIndex(index); // 해당 아이템을 클릭하면 편집 상태로 설정
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
              onClick={handleUpdateItemsPrice}
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
