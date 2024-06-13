import React, { useEffect, useState } from "react";
import cronStone from "../../images/cronStone.png";
import ItemImg from "../item/ItemImg";
import { formatCost } from "../../utils/formatUtil";
import ItemAPI from "../../utils/itemAPI";

export default function ItemsPerTry({
  items, // 아이템 이미지
  reinforcementData,
  cronStonePrice,
  handleCronStonePrice,
}) {
  const [editingCronStone, setEditingCronStone] = useState(false);
  const [memoryFragmentPrice, setMemoryFragmentPrice] = useState(0);
  const [editingMemoryFragmentPrice, setEditingMemoryFragmentPrice] =
    useState(false);

  // 기억의 파편 가격 업데이트
  useEffect(() => {
    const fetchItem = async () => {
      const response = await ItemAPI.getItemsByQuery(
        { name: "기억의 파편" },
        1,
      );
      setMemoryFragmentPrice(
        response.items[0].lastSoldPrice
          ? response.items[0].lastSoldPrice
          : response.items[0].basePrice,
      );
    };
    fetchItem();
  }, []);

  const handleCronStoneBlur = () => {
    setEditingCronStone(false);
  };

  const handleMemoryFragmentPriceBlur = () => {
    setEditingMemoryFragmentPrice(false);
  };

  return (
    <div>
      <h1 className="text-2xl mb-2">아이템 재화 가격</h1>
      <div className="flex items-center mb-4">
        <img src={cronStone} alt="크론석" className="w-12 h-12 mr-2" />
        <div className="ml-2">
          <p className="font-semibold">크론석</p>
          {editingCronStone ? (
            <input
              type="number"
              value={cronStonePrice}
              onChange={(e) => handleCronStonePrice(e.target.value)}
              onBlur={handleCronStoneBlur}
              className="border p-2 rounded"
              autoFocus
            />
          ) : (
            <p
              onClick={() => setEditingCronStone(true)}
              className="border p-2 rounded cursor-pointer w-32"
            >
              {formatCost(cronStonePrice)}
            </p>
          )}
        </div>
      </div>
      {items[0].type !== "악세사리" && (
        <>
          <div className="mb-4">
            {/* 기억의 파편 */}
            <div className="flex mb-4 items-center">
              <ItemImg item={{ id: 44195 }} className="w-12 h-12 mr-2" />
              <div className="ml-2">
                <div className="flex gap-1 items-center">
                  <p className="font-semibold">기억의 파편</p>
                  <p className="text-sm text-gray-600">
                    필요량:{" "}
                    {reinforcementData.durabilityLossOnFailure}개
                  </p>
                </div>

                {editingMemoryFragmentPrice ? (
                  <input
                    type="number"
                    value={memoryFragmentPrice}
                    onChange={(e) => setMemoryFragmentPrice(e.target.value)}
                    onBlur={handleMemoryFragmentPriceBlur}
                    className="border p-2 rounded w-32"
                    autoFocus
                  />
                ) : (
                  <p
                    onClick={() => setEditingMemoryFragmentPrice(true)}
                    className="border p-2 rounded cursor-pointer w-32"
                  >
                    {formatCost(memoryFragmentPrice)}
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                한번 트라이당 소모되는 기파의 가격:{" "}
                {formatCost(
                  memoryFragmentPrice *
                    reinforcementData.durabilityLossOnFailure,
                )}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
