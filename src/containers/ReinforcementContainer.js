import React, { useEffect, useState } from "react";
import anvil from "../images/anvil-black.png";
import ItemAPI from "../utils/itemAPI";
import ReinforcementDataTable from "../components/calculator/ReinforcementDataTable";
import ExchangePrice from "../components/calculator/ExchangePrice";
import ItemsPerTry from "../components/calculator/ItemsPerTry";
import SelectItem from "../components/calculator/SelectItem";

// EnhancedCalculatorContainer
export default function ReinforcementContainer({ itemId: _itemId }) {
  const [itemId, setItemId] = useState(_itemId); // 현재 선택된 아이템의 이름.
  const [items, setItems] = useState(null); // 선택된 아이템의 거래소 정보
  const [loading, setLoading] = useState(false);

  const [reinforcementInitData, setReinforcementInitData] = useState(null); // 강화 정보 초기 데이터
  const [reinforcementData, setReinforcementData] = useState(null); // 계속쓸 강화데이터 (강화확률이 포함되어있음.)
  const [cronStonePrice, setCronStonePrice] = useState(2240000); // 크론석 가격 224만원 or 300만원
  const [stacks, setStacks] = useState([]); // 강화 스택

  // 초기 데이터 로딩.
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await ItemAPI.getItemsByQuery({ id: itemId }, 1);
        setItems(response.items);

        // 강화 기본 정보 업데이트
        const data = await ItemAPI.getReinforcementInfo(response.items[0].type);
        setReinforcementInitData(data);
        // 강화 스택 초기 업데이트
        setStacks(data.recommendStack);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  // 강화 데이터 로딩
  useEffect(() => {
    if (items && items.length > 0 && reinforcementInitData) {
      const updatedData = makeReinforcementData(
        items,
        reinforcementInitData,
        stacks,
        cronStonePrice,
      );

      setReinforcementData(updatedData);
    }
  }, [items, cronStonePrice, stacks, reinforcementInitData]);

  const handleItemsPrice = (newPrices) => {
    const updatedItems = items.map((item, index) => ({
      ...item,
      lastSoldPrice: parseInt(newPrices[index]),
    }));
    setItems(updatedItems);
  };

  return (
    <div
      className="min-w-[1080px] mx-auto min-h-screen"
      style={{ padding: "8px 0 0 0" }}
    >
      <div className="flex bg-gray-400 rounded-lg">
        <img src={anvil} alt="icon" />
        <h1 className="m-2 text-3xl">강화 기댓값 계산기</h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          {!items || items.length === 0 ? (
            <span>데이터가 없습니다.</span>
          ) : (
            <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-4">
              <div className="col-span-1 row-span-1 bg-white p-4 shadow-md rounded-lg">
                {/* 거래소 가격 */}
                <ExchangePrice
                  items={items}
                  handleItemsPrice={handleItemsPrice}
                />
              </div>
              <div className="col-span-2 row-span-1 bg-white p-4 shadow-md rounded-lg">
                {/* 강화 정보 제공 테이블 */}
                {reinforcementData && (
                  <div className="flex flex-col">
                    <SelectItem items={items} handleItemId={setItemId} />
                    <ReinforcementDataTable
                      items={items}
                      reinforcementData={reinforcementData}
                      stacks={stacks}
                      handleStacks={setStacks}
                    />
                  </div>
                )}
              </div>
              <div className="col-span-1 row-span-1 bg-white p-4 shadow-md rounded-lg">
                <p>Item 3</p>
                <p>최근에 본 아이템들.</p>
              </div>
              <div className="col-span-1 row-span-1 bg-white p-4 shadow-md rounded-lg">
                {reinforcementData && (
                  <ItemsPerTry
                    items={items}
                    reinforcementData={reinforcementData}
                    cronStonePrice={cronStonePrice}
                    handleCronStonePrice={setCronStonePrice}
                  />
                )}
              </div>
              <div className="col-span-2 row-span-1 bg-white p-4 shadow-md rounded-lg">
                <p>하락할수 있는 강화 시뮬레이터</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 *
 * @param {item} items - 아이템 이름, 가격
 * @param {*} enhancingData - 강화 관련 정보, 크론석 소모갯수, 강화 스택 소프트캡 등.
 * @param {["장","광","고","유","동"에 해당하는 스택 ]} stacks - 몇 스택으로 강화할거냐?
 * @param {크론석 가격} cronStonePrice - 몇 스택으로 강화할거냐?
 * @param {강화시 필요한 아이템 재화 한개의 가격 (크론석 말고)} itemPricePerTry
 * @returns {아이템 가격,강화 성공확률, 아이템 등급 하락확률}
 */
const makeReinforcementData = (
  items,
  reinforcementData,
  stacks,
  cronStonePrice,
) => {
  const updatedReinforcementData = { ...reinforcementData };

  // 가격 정보 업데이트
  // price에는 price만 담기도록, lastSoldPrice나 basePrice둘중 하나만 담기게 바꾸기
  updatedReinforcementData.prices = items.map((item) =>
    item.lastSoldPrice !== 0 ? item.lastSoldPrice : item.basePrice,
  );

  // 강화 확률 계산
  updatedReinforcementData.reinforcementChance = stacks.map((stack, index) => {
    const baseChance = reinforcementData.reinforcementStart[index];
    const softCap = reinforcementData.stackSoftCap[index];
    const increaseBeforeSoftCap =
      reinforcementData.reinforceIncreasedAmountBeforeSoftCap[index];
    const increaseAfterSoftCap =
      reinforcementData.reinforceIncreasedAmountAfterSoftCap[index];
    const maxChange = reinforcementData.maxReinforcementChange[index];

    let chance = baseChance;
    if (stack <= softCap) {
      chance += stack * increaseBeforeSoftCap;
    } else {
      chance +=
        softCap * increaseBeforeSoftCap +
        (stack - softCap) * increaseAfterSoftCap;
    }
    return Math.min(chance, maxChange).toFixed(2);
  });

  // 아이템 강화를 실패 하였을 때, 아이템 등급이 하락할 확률은 40% 그러므로 (100-성공확률) * 하락할 확률 40%
  // 소수점 2번째 자리에서 올림.
  if (updatedReinforcementData.downgradeProbability > 0) {
    updatedReinforcementData.gradeDecreaseChance =
      updatedReinforcementData.reinforcementChance.map((chance, index) => {
        if (index === 0) return "0.00"; // 노강 -> 장트라이는 아이템 강화등급이 하락할수가 없음.
        return ((100 - parseFloat(chance)) * 0.4).toFixed(2);
      });
  } else {
    // 악세사리 강화 말고는 하락하지 않음.
    updatedReinforcementData.gradeDecreaseChance = [0, 0, 0, 0, 0];
  }

  // 강화 실패시, 강화등급 유지확률, 100퍼센트 - 강화 성공 확률 - 아이템 등급 하락 확률
  updatedReinforcementData.gradeMaintainChance =
    updatedReinforcementData.reinforcementChance.map((chance, index) =>
      (
        100 -
        parseFloat(chance) -
        parseFloat(updatedReinforcementData.gradeDecreaseChance[index])
      ).toFixed(2),
    );

  // 한번 트라이당 비용
  updatedReinforcementData.costPerTry = updatedReinforcementData.stages.map(
    (stage, index) => {
      const cronStoneCost =
        cronStonePrice * updatedReinforcementData.cronStones[index];
      let additionalItemsCost = 0;
      // 아이템 type이 "악세사리"면 가격 추가
      if (updatedReinforcementData.type === "악세사리") {
        additionalItemsCost =
          updatedReinforcementData.itemsPerTry[index].count *
          updatedReinforcementData.prices[0];
      }
      return cronStoneCost + additionalItemsCost;
    },
  );

  // 강화를 성공하기까지 평균 시도 횟수 계산
  updatedReinforcementData.averageTry =
    updatedReinforcementData.reinforcementChance.map((chance) =>
      (100 / parseFloat(chance)).toFixed(2),
    );

  // 강화 기댓값 계산
  // 강화에 성공했을떄, 성공확률 * (성공했을때의 아이템 가격 - 한번트라이당 비용 - 성공하기 이전 원래 아이템의 가격)
  // 강화에 실패했는데 아이템 등급이 유지 됬을떄, 아이템 등급 유지확률 * (-한번트라이당 비용 )
  // 강화에 실패했는데 아이템 등급이 하락 했을떄, 아이템 등급 하락확률 * (원래 아이템의 가격 - 하락한 아이템의 가격 -한번트라이당 비용 )
  updatedReinforcementData.netProfit = updatedReinforcementData.stages.map(
    (stage, index) => {
      // 확률은 지금은 %단위로 작성되어 있어서, ex: "14.6" => 0.146으로 변환
      const successChance =
        parseFloat(updatedReinforcementData.reinforcementChance[index]) / 100;
      const maintainChance =
        parseFloat(updatedReinforcementData.gradeMaintainChance[index]) / 100;
      const decreaseChance =
        parseFloat(updatedReinforcementData.gradeDecreaseChance[index]) / 100;

      const successProfit =
        successChance *
        (updatedReinforcementData.prices[index + 1] - // 성공 시 가격
          updatedReinforcementData.costPerTry[index] - // 트라이당 비용
          updatedReinforcementData.prices[index]); // 기존 가격

      const maintainLoss =
        maintainChance * -updatedReinforcementData.costPerTry[index];

      const decreaseLoss =
        decreaseChance > 0
          ? decreaseChance *
            (-updatedReinforcementData.prices[index] + // 기존 가격
              updatedReinforcementData.prices[index - 1] - // 하락 후 가격
              updatedReinforcementData.costPerTry[index]) // 트라이당 비용
          : 0;
      return successProfit + maintainLoss + decreaseLoss;
    },
  );

  return updatedReinforcementData;
};
