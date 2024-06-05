import React, { useEffect, useState } from "react";
import anvil from "../images/anvil-black.png";
import ItemAPI from "../utils/itemAPI";
import EnhanceTable from "../components/calculator/EnhanceTable";
import ItemImg from "../components/item/ItemImg";
import { formatDate } from "../components/item/ItemsTable";

// EnhancedCalculatorContainer
export default function EnCalContainer({ itemName }) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);

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

  //TODO: 아이템 이름에 맞는 강화 정보를 가져옴.
  const enhancingData = {
    name: [
      "데보레카 목걸이",
      "데보레카 허리띠",
      "데보레카 귀걸이",
      "데보레카 반지",
    ],
    // prices: [0, 0, 0, 0, 0, 0], // items의 0강, 장, 광, 고, 유, 동 각각의 가격
    cronStones: [95, 288, 865, 2405, 11548], // 강화단계별 크론석 소모 갯수
    enhancementStart: [25, 10, 7.5, 2.5, 0.5], // 0스택 확률
    enhanceIncreasedAmountBeforeSoftCap: [2.5, 1, 0.75, 0.25, 0.05], // 소프트캡 이전 1스택당 오르는 확률
    enhanceIncreasedAmountAfterSoftCap: [0.5, 0.2, 0.15, 0.05], // 소프트캡 이후 1스택당 오르는 확률
    stackSoftCap: [18, 40, 44, 110, 999999], // 스택 소프트캡. 동단계는 소프트캡없음.
    recommendStack: [30, 40, 80, 110, 280], // 기본값 스택,
    maxEnhancementChange: [90, 72, 56.4, 39.5, 15.5], // 강화확률 오를수 있는 최대 퍼센트.
    // enhancementChance: ["70%", "50%", "40.5%", "30%", "14.5%"], // 스택에 따른 확률을 계산해서 넣어줘야됨..
    // gradeDecreaseChance : ["5%", "10%", "15%", "20%", "25%"], // 강화 실패시 하락 아이템 등급 확률 40퍼센트
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
                <h1 className="text-2xl mb-2">거래소 가격</h1>
                <div>
                  {items.map((item) => (
                    <div key={item.sid} className="flex items-center mb-4">
                      <ItemImg item={item} />
                      <div>
                        <p className="text-lg font-semibold">
                          {getEnhancedItemName(item)}
                        </p>
                        <p>
                          {new Intl.NumberFormat().format(
                            item.lastSoldPrice
                              ? item.lastSoldPrice
                              : item.basePrice,
                          )}
                          원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div>가격업데이트 날짜</div>
                  <span>{formatDate(items[0].updateAt)}</span>
                </div>
              </div>
              <div className="col-span-2 row-span-1 bg-white p-4 shadow-md rounded-lg">
                {/* 강화 정보 제공 테이블 */}
                <EnhanceTable
                  items={items}
                  enhancingData={makeEnhancingData(
                    items,
                    enhancingData,
                    enhancingData.recommendStack,
                  )}
                />
              </div>
              <div className="col-span-1 row-span-1 bg-white p-4 shadow-md rounded-lg">
                <p>Item 3</p>
                <p>최근에 본 아이템들.</p>
              </div>
              <div className="col-span-1 row-span-1 bg-white p-4 shadow-md rounded-lg">
                <p>크론석 가격, 기억의 파편 가격</p>
              </div>
              <div className="col-span-2 row-span-1 bg-white p-4 shadow-md rounded-lg">
                <p>Item 5</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

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

/**
 *
 * @param {item} items - 아이템 이름, 가격
 * @param {*} enhancingData - 강화 관련 정보, 크론석 소모갯수, 강화 스택 소프트캡 등.
 * @param {["장","광","고","유","동"에 해당하는 스택 ]} stacks - 몇 스택으로 강화할거냐?
 * @returns
 */
const makeEnhancingData = (items, enhancingData, stacks) => {
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
    return Math.min(chance, maxChange);
  });

  // 아이템 강화를 실패 하였을 때, 아이템 등급이 하락할 확률은 40% 그러므로 (100-성공확률) * 하락할 확률 40%
  updatedEnhancingData.gradeDecreaseChance =
    updatedEnhancingData.enhancementChance.map(
      (chance) => (100 - parseFloat(chance)) * 0.4,
    );

  return updatedEnhancingData;
};
