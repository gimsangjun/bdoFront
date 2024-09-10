import React, { useEffect, useState } from "react";
import ItemImg from "../ItemImg";
import ItemAPI from "../../utils/itemAPI";

// 무역품 한 상자, item은 무역품 부모를 가르킴.
export default function CraftingToolDetails({ item, onCostUpdate }) {
  const [subItems, setSubItems] = useState([]); // 부모의 하위 재료(자기 자신)

  // 하위 아이템 가져오기.
  useEffect(() => {
    const fetchSubItems = async () => {
      if (item.components && item.components.length > 0) {
        try {
          const idsAndSids = {
            items: item.components.map((component) => ({
              id: Number(component.id),
              sid: 0,
            })),
          };

          // 하위 재료의 정보 가져오기.
          const fetchedSubItems = await ItemAPI.getItemsByIdandSid(
            idsAndSids.items,
          );

          // 하위 재료의 가져온 정보중 일치하는 데이터 가져오기
          const finalSubItems = item.components.map((component) => {
            const foundSubItem = fetchedSubItems.find(
              (subItem) => Number(subItem.id) === Number(component.id),
            );
            return {
              ...component,
              ...foundSubItem,
            };
          });
          console.log("fetchSubItems : ", item);
          console.log("fetchSubItems : ", finalSubItems);

          setSubItems(finalSubItems);
          const totalCost = finalSubItems.reduce(
            (sum, subItem) => sum + subItem.price * subItem.quantity,
            0,
          );
          onCostUpdate(item.id, totalCost);
        } catch (error) {
          console.error(
            "하위 아이템 정보를 가져오는 중 오류가 발생했습니다:",
            error,
          );
        }
      }
    };

    fetchSubItems();
  }, [item]);

  return (
    <div className="flex flex-col">
      {subItems.length > 0 && (
        <div className="ml-12">
          <h4 className="font-semibold mb-2">하위 재료:</h4>
          {subItems.map((subItem, index) => (
            <div key={index} className="flex items-center mb-4">
              <svg height="40" width="50" className="mx-2">
                <line
                  x1="0"
                  y1="20"
                  x2="50"
                  y2="20"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
              <div className="flex items-center p-4 border rounded bg-gray-100 shadow">
                <ItemImg item={subItem} className="w-8 h-8 mr-4" />
                <div>
                  <p>이름: {subItem.name}</p>
                  <p>수량: {subItem.quantity}</p>
                  <p>가격: {subItem.price}</p>
                </div>
              </div>
              {/* 재귀적으로 하위 재료들의 하위 재료들을 표시 */}
              {subItem.components && subItem.components.length > 0 && (
                <div className="mt-2 ml-8">
                  <CraftingToolDetails item={subItem} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
