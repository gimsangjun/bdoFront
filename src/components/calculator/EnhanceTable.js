import React from "react";
import ItemImg from "../item/ItemImg";
import { formatCost } from "../../utils/formatUtil";
import tw from "twin.macro";

export default function EnhanceTable({ items, enhancingData }) {
  // console.log("EnhanceTable:", enhancingData);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <ItemImg item={items[0]} />
        <span className="m-2">{items[0].name}</span>
      </div>
      <div>
        <table className="table-auto w-full">
          <thead>
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
                  {chance}
                </Td>
              ))}
            </tr>
            <tr>
              <Td className="border px-4 py-2">하락 확률</Td>
              {enhancingData.gradeDecreaseChance.map((chance, index) => (
                <Td key={index} className="border px-4 py-2">
                  {chance}
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
                <Td key={index} className="border px-4 py-2">
                  {formatCost(profit)}
                </Td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Th = tw.th`px-4 py-2 whitespace-nowrap`;
const Td = tw.td`border px-4 py-2 whitespace-nowrap`;
