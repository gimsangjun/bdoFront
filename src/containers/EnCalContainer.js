import React, { useEffect, useState } from "react";
import anvil from "../images/anvil-black.png";
import ItemAPI from "../utils/itemAPI";
import EnhanceTable from "../components/calculator/EnhanceTable";
import ExchangePrice from "../components/calculator/ExchangePrice";
import ItemsPerTry from "../components/calculator/ItemsPerTry";

// EnhancedCalculatorContainer
export default function EnCalContainer({ itemName }) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const [enhancingData, setEnhancingData] = useState(null);
  const [cronStonePrice, setCronStonePrice] = useState(2240000); // 크론석 가격 224만원 or 300만원
  const [itemNamePerTry, setItemNamePerTry] = useState(null); // 강화를 할때 마다 들어가는 아이템 이름(크론석 말고)
  const [itemPricePerTry, setItemPricePerTry] = useState(null); // 강화를 할때 마다 들어가는 아이템 가격(크론석 말고)
  const [stacks, setStacks] = useState([]); // 강화 스택
  // 초기 데이터 로딩.
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await ItemAPI.getItemsByQuery({ name: itemName }, 1);
        setItems(response.items);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemName]);

  // 강화 데이터 로딩
  useEffect(() => {
    if (items && items.length > 0) {
      // TODO: 아랫부분은 나중에 DB에 저장해야될지도?, 종류별로 아이템 초기데이터 다 구성하고 DB구성하자.
      const initEnhancingData = {
        name: [
          "데보레카 목걸이",
          "데보레카 허리띠",
          "데보레카 귀걸이",
          "데보레카 반지",
        ],
        stages: ["장", "광", "고", "유", "동"],
        cronStones: [95, 288, 865, 2405, 11548], // 강화단계별 크론석 소모 갯수
        enhancementStart: [25, 10, 7.5, 2.5, 0.5], // 0스택 확률
        enhanceIncreasedAmountBeforeSoftCap: [2.5, 1, 0.75, 0.25, 0.05], // 소프트캡 이전 1스택당 오르는 확률
        enhanceIncreasedAmountAfterSoftCap: [0.5, 0.2, 0.15, 0.05], // 소프트캡 이후 1스택당 오르는 확률
        stackSoftCap: [18, 40, 44, 110, 999999], // 스택 소프트캡. 동단계는 소프트캡없음.
        recommendStack: [30, 40, 80, 110, 280], // 기본값 추천 스택,
        maxEnhancementChange: [90, 72, 56.4, 39.5, 15.5], // 강화확률 오를수 있는 최대 퍼센트.
        itemsPerTry: [
          // 강화단계별 크론석 제외 필요한 아이템, 이름이 없는 경우(ex 악세), 자기자신0단계가 들어감.
          // Ex 무결한 혼돈의 블랙스톤 등등.
          { name: "", count: 1 },
          { name: "", count: 1 },
          { name: "", count: 1 },
          { name: "", count: 1 },
          { name: "", count: 1 },
        ],
        //TODO: 기억의 파편이 필요한 경우 따로 key값 만들어야해야할듯
      };

      // 강화 시도할때마다 드는 재화 초기 업데이트 (크론석 말고)
      if (itemNamePerTry === null && itemPricePerTry === null) {
        if (initEnhancingData.itemsPerTry[0].name === "") {
          setItemNamePerTry(itemName);
          setItemPricePerTry(
            items[0].lastSoldPrice
              ? items[0].lastSoldPrice
              : items[0].basePrice,
          );
        } else {
          // TODO: 나중에 악세사리말고 그냥 장비들도 처리할수 있게 바꿔야됨.
          setItemNamePerTry(initEnhancingData.itemsPerTry[0].name);
          setItemPricePerTry(1000);
        }
      }

      // 강화 스택 초기 업데이트
      if (stacks.length === 0) {
        setStacks(initEnhancingData.recommendStack);
      }

      const updatedData = makeEnhancingData(
        items,
        initEnhancingData,
        stacks,
        cronStonePrice,
        itemPricePerTry,
      );

      setEnhancingData(updatedData);
    }
  }, [
    items,
    cronStonePrice,
    itemName,
    itemPricePerTry,
    itemNamePerTry,
    stacks,
  ]);

  const handleCronStonePrice = (price) => {
    setCronStonePrice(price);
  };

  const handleItemPricePerTry = (price) => {
    setItemPricePerTry(price);
  };

  const handleItemsPrice = (newPrices) => {
    const updatedItems = items.map((item, index) => ({
      ...item,
      lastSoldPrice: parseInt(newPrices[index]),
    }));
    setItems(updatedItems);
  };

  const handleStacks = (newStacks) => {
    setStacks(newStacks);
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
                  enhancingData={enhancingData}
                  handleItemsPrice={handleItemsPrice}
                />
              </div>
              <div className="col-span-2 row-span-1 bg-white p-4 shadow-md rounded-lg">
                {/* 강화 정보 제공 테이블 */}
                {enhancingData && (
                  <EnhanceTable
                    items={items}
                    enhancingData={enhancingData}
                    stacks={stacks}
                    handleStacks={handleStacks}
                  />
                )}
              </div>
              <div className="col-span-1 row-span-1 bg-white p-4 shadow-md rounded-lg">
                <p>Item 3</p>
                <p>최근에 본 아이템들.</p>
              </div>
              <div className="col-span-1 row-span-1 bg-white p-4 shadow-md rounded-lg">
                {itemPricePerTry && (
                  <ItemsPerTry
                    items={items}
                    enhancingData={enhancingData}
                    cronStonePrice={cronStonePrice}
                    handleCronStonePrice={handleCronStonePrice}
                    itemPricePerTry={itemPricePerTry}
                    handleItemPricePerTry={handleItemPricePerTry}
                    itemNamePerTry={itemNamePerTry}
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
const makeEnhancingData = (
  items,
  enhancingData,
  stacks,
  cronStonePrice,
  itemPricePerTry,
) => {
  const updatedEnhancingData = { ...enhancingData };

  // 가격 정보 업데이트
  // price에는 price만 담기도록, lastSoldPrice나 basePrice둘중 하나만 담기게 바꾸기
  updatedEnhancingData.prices = items.map((item) =>
    item.lastSoldPrice !== 0 ? item.lastSoldPrice : item.basePrice,
  );

  // 강화 확률 계산
  updatedEnhancingData.enhancementChance = stacks.map((stack, index) => {
    const baseChance = enhancingData.enhancementStart[index];
    const softCap = enhancingData.stackSoftCap[index];
    const increaseBeforeSoftCap =
      enhancingData.enhanceIncreasedAmountBeforeSoftCap[index];
    const increaseAfterSoftCap =
      enhancingData.enhanceIncreasedAmountAfterSoftCap[index];
    const maxChange = enhancingData.maxEnhancementChange[index];

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
  updatedEnhancingData.gradeDecreaseChance =
    updatedEnhancingData.enhancementChance.map((chance, index) => {
      if (index === 0) return "0.00"; // 노강 -> 장트라이는 아이템 강화등급이 하락할수가 없음.
      return ((100 - parseFloat(chance)) * 0.4).toFixed(2);
    });

  // 강화 실패시, 강화등급 유지확률, 100퍼센트 - 강화 성공 확률 - 아이템 등급 하락 확률
  updatedEnhancingData.gradeMaintainChance =
    updatedEnhancingData.enhancementChance.map((chance, index) =>
      (
        100 -
        parseFloat(chance) -
        parseFloat(updatedEnhancingData.gradeDecreaseChance[index])
      ).toFixed(2),
    );

  // 한번 트라이당 비용
  updatedEnhancingData.costPerTry = updatedEnhancingData.stages.map(
    // 악세사리의 경우 0강짜리 악세 하나 소모.
    // TODO: 악세사리말고 다른 아이템의 경우 다르게 처리해야됨.
    (stage, index) => {
      const cronStoneCost =
        cronStonePrice * updatedEnhancingData.cronStones[index];
      let additionalItemsCost = 0;
      if (updatedEnhancingData.itemsPerTry[index].name === "") {
        additionalItemsCost =
          updatedEnhancingData.itemsPerTry[index].count * itemPricePerTry;
      } else {
        //TODO 악세사리 제외 다른 아이템들은 다른 아이템을 소모하여 강화를 함. 그 경우는 나중에.
      }

      return cronStoneCost + additionalItemsCost;
    },
  );

  // 강화를 성공하기까지 평균 시도 횟수 계산
  updatedEnhancingData.averageTry = updatedEnhancingData.enhancementChance.map(
    (chance) => (100 / parseFloat(chance)).toFixed(2),
  );

  // 강화 기댓값 계산
  // 강화에 성공했을떄, 성공확률 * (성공했을때의 아이템 가격 - 한번트라이당 비용 - 성공하기 이전 원래 아이템의 가격)
  // 강화에 실패했는데 아이템 등급이 유지 됬을떄, 아이템 등급 유지확률 * (-한번트라이당 비용 )
  // 강화에 실패했는데 아이템 등급이 하락 했을떄, 아이템 등급 하락확률 * (원래 아이템의 가격 - 하락한 아이템의 가격 -한번트라이당 비용 )
  updatedEnhancingData.netProfit = updatedEnhancingData.stages.map(
    (stage, index) => {
      // 확률은 지금은 %단위로 작성되어 있어서, ex: "14.6" => 0.146으로 변환
      const successChance =
        parseFloat(updatedEnhancingData.enhancementChance[index]) / 100;
      const maintainChance =
        parseFloat(updatedEnhancingData.gradeMaintainChance[index]) / 100;
      const decreaseChance =
        parseFloat(updatedEnhancingData.gradeDecreaseChance[index]) / 100;

      const successProfit =
        successChance *
        (updatedEnhancingData.prices[index + 1] - // 성공 시 가격
          updatedEnhancingData.costPerTry[index] - // 트라이당 비용
          updatedEnhancingData.prices[index]); // 기존 가격

      const maintainLoss =
        maintainChance * -updatedEnhancingData.costPerTry[index];

      const decreaseLoss =
        decreaseChance > 0
          ? decreaseChance *
            (-updatedEnhancingData.prices[index] + // 기존 가격
              updatedEnhancingData.prices[index - 1] - // 하락 후 가격
              updatedEnhancingData.costPerTry[index]) // 트라이당 비용
          : 0;

      return successProfit + maintainLoss + decreaseLoss;
    },
  );

  return updatedEnhancingData;
};
