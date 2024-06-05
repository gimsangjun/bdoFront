import React from "react";
import ItemImg from "../item/ItemImg";

export default function EnhanceTable({ items, enhancingData }) {
  console.log("EnhanceTable", enhancingData);
  const tableData = {
    stages: ["장", "광", "고", "유", "동"],
    cronStones: [95, 288, 865, 2405, 11548],
    recommendedStack: [30, 40, 44, 110, 280],
    enhancementChance: ["70%", "50%", "40.5%", "30%", "14.5%"],
    decreaseChance: ["5%", "10%", "15%", "20%", "25%"], // 강화 실패시 하락확률 40퍼센트
    netProfit: ["100,000", "200,000", "300,000", "400,000", "500,000"],
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <ItemImg item={items[0]} />
        <span className="m-2">데보레카 목걸이</span>
      </div>
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">강화 단계</th>
              {tableData.stages.map((stage, index) => (
                <th key={index} className="px-4 py-2">
                  {stage}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">크론석 소모</td>
              {tableData.cronStones.map((cronStone, index) => (
                <td key={index} className="border px-4 py-2">
                  {cronStone}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">추천 스택</td>
              {tableData.recommendedStack.map((stack, index) => (
                <td key={index} className="border px-4 py-2">
                  {stack}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">강화 성공 확률</td>
              {tableData.enhancementChance.map((chance, index) => (
                <td key={index} className="border px-4 py-2">
                  {chance}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">하락 확률</td>
              {tableData.decreaseChance.map((chance, index) => (
                <td key={index} className="border px-4 py-2">
                  {chance}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">트라이당 비용</td>
              {tableData.decreaseChance.map((chance, index) => (
                <td key={index} className="border px-4 py-2">
                  {chance}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">득실 (수수료 포함)</td>
              {tableData.netProfit.map((profit, index) => (
                <td key={index} className="border px-4 py-2">
                  {profit}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
