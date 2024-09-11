import React, { useState, useEffect } from "react";
import ItemAPI from "../utils/itemAPI";
import ComponentItemContainer from "../components/processing-trade/ComponentItemContainer";

// 가공 무역
export default function ProcessingTradeContainer() {
  const [items, setItems] = useState([]); // 가공 무역 아이템 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  // 무역레벨은 1부터 140까지 있다.  (명장20 = 무역레벨70, 도인1 = 무역레벨 80, 도인 50 = 무역레벨130 )
  // 생활레벨은 초급10 ㅡ 견습10 ㅡ 숙련10 ㅡ 전문10 ㅡ 장인10 ㅡ 명장30 ㅡ 도인50 순서로 이루어진다.
  // 사용자에게 장인1레벨부터 선택할수 있게 해준다.
  const [tradeLevel, setTradeLevel] = useState(70); // 무역레벨, 장인~도인정도까지만?
  const [distanceBonus, setDistanceBonus] = useState(150); // 거리 보너스, 마을별로는 안해도될듯
  const [updateAt, setUpdateAt] = useState();

  const fetchItems = async () => {
    try {
      const fetchedItems = await ItemAPI.getItemsByQuery(
        { mainCategory: 300 }, // category가 300번대가 가공무역품 아이템 정보
        1,
      );
      setItems(fetchedItems.items);
    } catch (error) {
      console.error("아이템 정보를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePrices = async () => {
    try {
      let itemsToUpdate = new Map();
      const addItemWithSubcomponents = async (item) => {
        if (!itemsToUpdate.has(item.id)) {
          itemsToUpdate.set(item.id, item);
        }
        if (item.components && item.components.length > 0) {
          for (const component of item.components) {
            // 하위재료가 또 하위재료를 가지고 있을수 있으므로 데이터를 가져와야됨.
            const fetchedItems = await ItemAPI.getItemsByIdandSid([
              { id: component.id, sid: component.sid || 0 },
            ]);
            // 배열로 반환될 수 있으므로 각 아이템에 대해 처리
            if (fetchedItems && fetchedItems.length > 0) {
              await addItemWithSubcomponents(fetchedItems[0]); // 재귀적으로 처리
            }
          }
        }
      };

      for (const item of items) {
        await addItemWithSubcomponents(item);
      }

      itemsToUpdate.forEach((item, key) => {
        if (item.mainCategory === 300) {
          itemsToUpdate.delete(key);
        }
      });

      const itemsArray = Array.from(itemsToUpdate.values());
      if (itemsArray.length > 0) {
        await ItemAPI.updateItemsPrice(itemsArray);
        await fetchItems();
        alert("가격이 업데이트 되었습니다.");
      } else {
        alert("업데이트할 아이템이 없습니다.");
      }
    } catch (error) {
      console.error("가격 업데이트 중 오류가 발생했습니다:", error);
    }
  };

  // 날짜 형식으로 변환해주는 함수
  const formatUpdateAt = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-[1080px] mx-auto">
      {/* 거리 보너스, 무역 레벨, 업데이트 버튼 및 마지막 업데이트 시간 */}
      <div className="flex flex-col p-3 m-2 bg-gray-100 rounded-md shadow-md w-full mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-500 inline-block pb-1">
              가공무역 계산기
            </h3>
          </div>
          <div className="flex items-center gap-6">
            {/* 거리 보너스 입력 */}
            <div className="flex flex-col items-start">
              <label className="text-gray-700 text-sm font-semibold">
                거리 보너스
              </label>
              <input
                type="number"
                value={distanceBonus}
                onChange={(e) => setDistanceBonus(e.target.value)}
                className="text-right w-24 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
              />
            </div>
            {/* 무역 레벨 선택 */}
            <div className="flex flex-col items-start">
              <label className="text-gray-700 text-sm font-semibold">
                무역 레벨
              </label>
              <select
                value={tradeLevel}
                onChange={(e) => setTradeLevel(parseInt(e.target.value))}
                className="text-right w-32 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
              >
                {[...Array(20)].map((_, i) => (
                  <option key={90 + i} value={90 + i}>
                    명장{i + 10}레벨
                  </option>
                ))}
                {[...Array(10)].map((_, i) => (
                  <option key={110 + i} value={110 + i}>
                    도인{i + 1}레벨
                  </option>
                ))}
              </select>
            </div>
            {/* 전체 가격 업데이트 버튼 */}
            <button
              onClick={handleUpdatePrices}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 flex items-center"
            >
              전체 가격 업데이트
            </button>
          </div>
        </div>
        {/* 마지막 업데이트 시간 */}
        <div className="text-right text-gray-500 text-sm mt-1">
          마지막 업데이트: {formatUpdateAt(updateAt)}
        </div>
      </div>

      {/* 아이템 목록 */}
      <div className="w-full flex flex-wrap gap-2">
        {items.map((item) => (
          <ComponentItemContainer
            key={item.id}
            item={item}
            distanceBonus={distanceBonus}
            tradeLevel={tradeLevel}
            setUpdateAt={setUpdateAt}
          />
        ))}
      </div>
    </div>
  );
}
