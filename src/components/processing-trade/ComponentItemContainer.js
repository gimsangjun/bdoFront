import React, { useEffect, useState } from "react";
import ItemAPI from "../../utils/itemAPI";
import ItemImg from "../ItemImg";
import ComponentItem from "./ComponentItem";

// 부모(자기자신) + 하위아이템 컴포넌트
// component는 하위 재료를 뜻함.
// ex 하나의 가시 목재 상자.
/**
 *
 * @param {item, distanceBonus, tradeLevel} 부모아이템, 거리 보너스, 무역레벨
 * @returns
 */
export default function ComponentItemContainer({
  item: parentItem,
  distanceBonus,
  tradeLevel,
  setUpdateAt,
}) {
  const [allComponents, setAllComponents] = useState([]); // 하위 재료의 하위 재료 까지 모든 정보를 저장하는 곳.
  const [totalCost, setTotalCost] = useState(0); // 제작비용
  const [salePrice, setSalePrice] = useState(0); // 판매가
  const [profit, setProfit] = useState(0); // 이득
  const outputPerProcess = 2.3; // 1회 가공시 나오는 수량

  // 판매가 계산
  const calculateSalePrice = (price) => {
    // 판매가 계산 공식 : 원가 * (1+거리보너스/100) * (1+무역레벨/200 + 0.05)
    return price * (1 + distanceBonus / 100) * (1 + tradeLevel / 200 + 0.05);
  };

  // parentItem 1개를 만드는데 필요한 가장 하위 재료의 수량 계산
  const calculateBaseMaterialsNeeded = (item) => {
    const baseMaterials = {};

    // 재귀 함수
    // parentMake : item을 몇개를 만들어야 되냐
    const traverseComponents = (item, parentMake = 1) => {
      // item이 최종적으로 만들어야할 대상이라면
      if (item.quantity === 1) {
        // 필요한 하위 재료의 갯수
        item.forEach((component) => {
          // console.log("하위 재료", component);
          // 하위 재료에 더 하위 재료가 있다면, 재귀적으로 처리
          if (component.components && component.components.length > 0) {
            // parentMake와 현재 component의 수량을 곱해서 하위 재료에 전달
            traverseComponents(
              component.components,
              parentMake * component.quantity,
            );
          } else {
            // 가장 하위 재료인 경우, baseMaterials에 수량을 누적
            if (baseMaterials[component.id]) {
              baseMaterials[component.id] += component.quantity * parentMake;
            } else {
              baseMaterials[component.id] = component.quantity * parentMake;
            }
          }
        });
      } else {
        // item이 최종 아이템이 아니라면, 즉 하위 재료를 만드는것이라면
        item.forEach((component) => {
          // console.log("최종 아이템의 하위 재료", component);
          // 하위재료가 더 있다면,
          if (component.components && component.components.length > 0) {
            traverseComponents(
              component.components,
              Math.ceil((parentMake * component.quantity) / outputPerProcess), // 최종 아이템인 아닌 하위 재료를 만드는 경우라면 한번 만들때마다 2.3개가 나옴.
            );
          } else {
            // 내가 마지막 하위 재료라면.
            if (baseMaterials[component.id]) {
              baseMaterials[component.id] += Math.ceil(
                (parentMake * component.quantity) / outputPerProcess,
              );
            } else {
              baseMaterials[component.id] = Math.ceil(
                (parentMake * component.quantity) / outputPerProcess,
              );
            }
          }
        });
      }
    };

    traverseComponents(item);
    return baseMaterials;
  };

  // 전체 제작 비용 계산, 최하위 하위 재료들을 가지고 계산.
  const calculateTotalCost = async (baseMaterials) => {
    // baseMaterials 객체에서 각 재료의 id와 필요한 수량을 추출
    const ids = Object.keys(baseMaterials).map((id) => ({
      id: parseInt(id),
      sid: 0,
    }));

    try {
      const fetchedItems = await ItemAPI.getItemsByIdandSid(ids);

      // 총 제작 비용 계산
      let totalCost = 0;

      // 가져온 재료 정보와 baseMaterials의 수량을 곱하여 총 비용 계산
      fetchedItems.forEach((item) => {
        const quantity = baseMaterials[item.id]; // 해당 아이템의 필요한 수량
        const cost = item.price * quantity; // 가격 * 수량
        totalCost += cost; // 총 비용에 더함
      });

      return totalCost; // 최종 총 비용 반환
    } catch (error) {
      console.error("가격 정보를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  // 이득 계산 함수
  const calculateProfit = (totalCost, salePrice) => {
    return salePrice - totalCost;
  };

  /**
   * 하위 재료의 정보를 가져오는 함수, 재귀적으로 호출할거임.
   * @param {item}  item은 부모가 되는 아이템
   * @returns 하위 재료들의 정보 업데이트
   */
  const fetchAllComponents = async (item) => {
    if (item.components.length === 0) {
      return [];
    }

    // item 하위재료의 id를 가져오기
    const idsAndSids = item.components.map((component) => ({
      id: Number(component.id),
      sid: 0,
    }));

    const fetchedComponents = await ItemAPI.getItemsByIdandSid(idsAndSids);

    const updates = await Promise.all(
      item.components.map(async (component) => {
        // 데이터를 받아온 item의 component와 일치하는 fetchedComponents를 찾음.
        const matchingComponent = fetchedComponents.find(
          (c) => c.id === component.id,
        );

        // component의 정보를 업데이트
        const updatedComponent = matchingComponent
          ? { ...component, ...matchingComponent }
          : component;

        // 정보를 업데이트 했더니 이 녀석도 하위재료를 가지고 있음.
        if (
          updatedComponent.components &&
          updatedComponent.components.length > 0
        ) {
          updatedComponent.components = await fetchAllComponents(
            updatedComponent,
          );
        }

        return updatedComponent;
      }),
    );

    return updates;
  };

  // 하위 재료 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const componentsWithDetails = await fetchAllComponents(parentItem);
      setAllComponents(componentsWithDetails);
      setUpdateAt(componentsWithDetails[0].updateAt);
    };

    fetchData();
  }, [parentItem]);

  // 금액계산, 코스트 계산.
  useEffect(() => {
    const fetchCostAndProfit = async () => {
      if (allComponents.length > 0) {
        const baseMaterials = calculateBaseMaterialsNeeded(allComponents); // 아이템을 만드는데 필요한 하위 재료 계산

        const cost = await calculateTotalCost(baseMaterials); // 하위재료의 가격 계산
        setTotalCost(cost);

        const sale = calculateSalePrice(parentItem.price).toFixed(0); // 만든 아이템의 판매가 계산
        setSalePrice(sale);

        const profit = calculateProfit(cost, sale); // 이득 계산.
        setProfit(profit);
      }
    };

    // 비동기 작업 실행
    fetchCostAndProfit();
  }, [allComponents, parentItem, distanceBonus, tradeLevel]);

  return (
    <div className="flex flex-row mb-6 p-6 w-full bg-white shadow-md rounded-lg items-start">
      <div className="p-6 w-1/2 bg-gray-100 rounded-lg">
        <div className="flex items-center mb-6">
          {/* 부모 아이템 이미지와 이름 */}
          <ItemImg
            item={parentItem}
            className="w-16 h-16 mr-6 border-2 border-gray-300 shadow-sm"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {parentItem.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              가격: {parentItem.price} 골드
            </p>
          </div>
        </div>

        {/* 제작 재료 */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
            제작 재료
          </h4>
          <div className="space-y-4">
            {allComponents.map((component, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-all duration-300 ease-in-out"
              >
                <ItemImg
                  item={component}
                  className="w-10 h-10 mr-4 border-2 border-gray-300"
                />
                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {component.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      수량: {component.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-blue-500">
                    가격: {component.price} 골드
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 제작비용, 판매가, 이득 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow-md">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-semibold text-gray-600">제작비용</p>
              <p className="text-xl font-bold text-gray-800">
                {totalCost} 골드
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">판매가</p>
              <p className="text-xl font-bold text-green-600">
                {salePrice} 골드
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">이득</p>
              <p
                className={`text-xl font-bold ${
                  profit > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {profit.toFixed(0)} 골드
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 제작재료의 하위 아이템들 */}
      <div className="ml-6 w-1/2 h-full bg-gray-100 p-4 rounded-lg shadow-lg">
        <h4 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
          하위 재료
        </h4>
        {allComponents.map((component, index) => (
          <ComponentItem key={index} item={component} />
        ))}
      </div>
    </div>
  );
}
