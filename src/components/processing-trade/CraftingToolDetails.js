import React, { useEffect, useState } from "react";
import ItemImg from "../ItemImg";
import ItemAPI from "../../utils/itemAPI";

export default function CraftingToolDetails({ item }) {
  const [subItems, setSubItems] = useState([]); // 하위 재료 정보를 저장할 상태

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

          const fetchedSubItems = await ItemAPI.getItemsByIdandSid(
            idsAndSids.items,
          );

          const finalSubItems = item.components.map((component) => {
            const foundSubItem = fetchedSubItems.find(
              (subItem) => Number(subItem.id) === Number(component.id),
            );
            return {
              ...component,
              ...foundSubItem, // 이제 fetchedSubItems에서 가져온 정보를 병합
            };
          });

          setSubItems(finalSubItems);
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
      <div className="flex items-center p-4 border rounded bg-white shadow mb-4">
        <ItemImg item={item} className="w-12 h-12 mr-4" />
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p>가격: {item.price}</p>
        </div>
        {/* TODO: 여기에 만드는 가격, 판매가격 넣으면 될듯.*/}
      </div>

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
