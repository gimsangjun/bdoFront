import React from "react";
import { formatImgUrl } from "../item/ItemImg";

// 가공무역- 아이템 컴포넌트
export default function CraftingToolDetails({ item }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <img src={formatImgUrl(item)} alt="Tool Icon" className="w-12 h-12" />
        <div className="ml-4">
          <h2 className="text-xl font-bold">{item.name}</h2>
          {/* 아이템 설명 */}
          <p className="text-sm text-gray-600">
            {item.details.map((detail, index) => (
              <span key={index}>
                {detail}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* 제작 하위 재료 */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">하위 재료</h3>
        <div className="flex flex-col space-y-2">
          {item.materianls.map((material) => (
            <div key={material.id} className="flex items-center">
              <img
                src={formatImgUrl(material)}
                alt="Material Icon"
                className="w-6 h-6"
              />
              <span className="ml-2">
                {material.name} x {material.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
