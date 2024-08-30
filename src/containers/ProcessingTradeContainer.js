import React, { useState, useEffect } from "react";
import CraftingToolDetails from "../components/processing-trade/CraftingToolDetails";
import ItemAPI from "../utils/itemAPI";

export default function ProcessingTradeContainer() {
  const [items, setItems] = useState([]); // 아이템 정보를 저장할 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  const fetchItems = async () => {
    try {
      const fetchedItems = await ItemAPI.getItemsByQuery(
        { mainCategory: 300 },
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
      const addItemWithSubcomponents = (item) => {
        if (!itemsToUpdate.has(item.id)) {
          itemsToUpdate.set(item.id, item);
        }
        if (item.components && item.components.length > 0) {
          item.components.forEach((component) => {
            addItemWithSubcomponents(component);
          });
        }
      };

      items.forEach((item) => {
        addItemWithSubcomponents(item);
      });

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

  useEffect(() => {
    fetchItems();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-[1200px] mx-auto">
      <div className="self-end pr-4 pt-4">
        <button
          onClick={handleUpdatePrices}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          전체 가격 업데이트
        </button>
      </div>
      {/* 한 줄에 2개의 CraftingToolDetails을 배치 */}
      <div className="w-full flex flex-wrap">
        {items.map((item) => (
          <div key={item.id} className="p-2 w-1/2">
            <CraftingToolDetails item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
