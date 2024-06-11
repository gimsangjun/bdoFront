import React from "react";
import ItemImg from "../item/ItemImg";
import { formatCost } from "../../utils/formatUtil";
import tw from "twin.macro";

export default function EnhanceTable({
  items,
  enhancingData,
  stacks,
  handleStacks,
}) {
  const handleStackChange = (e, index) => {
    const newStacks = [...stacks];
    newStacks[index] = e.target.value;
    handleStacks(newStacks);
  };

  // 기대값이 가장 높은 부분을 찾음
  // maxIndex: 현재까지 가장 큰 기대값의 인덱스를 저장하는 누산기
  // profit: 현재 순회 중인 배열 요소 (enhancingData.netProfit의 현재 값)
  // index: 현재 순회 중인 배열 요소의 인덱스
  // array: 원본 배열 (enhancingData.netProfit)
  // 초기값으로 0을 설정하여 첫 번째 요소를 초기 최대값으로 설정
  const maxNetProfitIndex = enhancingData.netProfit.reduce(
    (maxIndex, profit, index, array) =>
      parseInt(profit) > parseInt(array[maxIndex]) ? index : maxIndex,
    0,
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <ItemImg item={items[0]} />
        <span className="ml-2 text-lg font-semibold">{items[0].name}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <Th className="px-4 py-2">강화 단계</Th>
              {enhancingData.stages.map((stage, index) => (
                <Th key={index} className="px-4 py-2">
                  {stage}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td className="border px-4 py-2">크론석 소모 갯수</Td>
              {enhancingData.cronStones.map((cronStone, index) => (
                <Td key={index} className="border px-4 py-2">
                  {cronStone}
                </Td>
              ))}
            </tr>
            <tr>
              <Td className="border px-4 py-2">추천 스택</Td>
              {enhancingData.recommendStack.map((stack, index) => (
                <Td key={index} className="border px-4 py-2">
                  {stack}
                </Td>
              ))}
            </tr>
            <tr>
              <Td className="border px-4 py-2">강화 성공 확률</Td>
              {enhancingData.enhancementChance.map((chance, index) => (
                <Td key={index} className="border px-4 py-2">
                  {chance}%
                </Td>
              ))}
            </tr>
            <tr>
              <Td className="border px-4 py-2">하락 확률</Td>
              {enhancingData.gradeDecreaseChance.map((chance, index) => (
                <Td key={index} className="border px-4 py-2">
                  {chance}%
                </Td>
              ))}
            </tr>
            <tr>
              <Td className="border px-4 py-2">트라이당 비용</Td>
              {enhancingData.costPerTry.map((cost, index) => (
                <Td key={index} className="border px-4 py-2">
                  {formatCost(cost)}
                </Td>
              ))}
            </tr>
            <tr>
              <Td className="border px-4 py-2">평균 시도 횟수(하락 x) </Td>
              {enhancingData.averageTry.map((averageTry, index) => (
                <Td key={index} className="border px-4 py-2">
                  {averageTry}
                </Td>
              ))}
            </tr>
            <tr>
              <Td className="border px-4 py-2">기대값 (수수료 미포함)</Td>
              {enhancingData.netProfit.map((profit, index) => (
                <Td
                  key={index}
                  className={`border px-4 py-2 ${
                    index === maxNetProfitIndex ? "bg-yellow-200" : ""
                  }`}
                >
                  {formatCost(profit)}
                </Td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">강화 스택 입력 하기</h2>
        <div className="flex space-x-2">
          {stacks.map((stack, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-sm mb-1">
                {enhancingData.stages[index]}
              </span>
              <input
                type="number"
                value={stacks[index]}
                onChange={(e) => handleStackChange(e, index)}
                className="border p-2 rounded w-20 text-center"
                autoFocus={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Th = tw.th`px-4 py-2 text-center whitespace-nowrap`;
const Td = tw.td`border px-4 py-2 text-center whitespace-nowrap`;
