import React from "react";

const imgUrl = "https://cdn.bdolytics.com/";

export default function DataTdName({ item }) {
  return (
    <div className={`flex items-center ${getItemColor(item)}`}>
      <img
        src={foramtImgUrl(item)}
        className={`mr-1 border ${getItemColor(item)} `}
        alt={item.name}
        style={{ width: "32px", height: "32px", borderRadius: "2px" }}
      />
      <span>{formatName(item)}</span>
    </div>
  );
}

// 소모성 아이템부터 DB업데이트하기 힘들어서 그만함. 음식이름이 다 달라가지고..
const getItemColor = (item) => {
  switch (item.grade) {
    case "legendary":
      // "text-orange-400 border-orange-400";
      return "text-[#d36200] border-[#d36200]";
    case "epic":
      // "text-yellow-400 border-yellow-400";
      return "text-[#f6c232] border-[#f6c232]";
    case "rare":
      // "text-blue-600 border-blue-600";
      return "text-[#0391c4] border-[#0391c4]";
    case "uncommon":
      // "text-[#5ff369] border-[#5ff369]"
      //
      return "text-green-600 border-green-600";
    default: // common
      // "text-[#fff] border-[#fff]";
      // "text-gray-600 border-gray-600";
      return "text-gray-600 border-gray-600";
  }
};

export const foramtImgUrl = (item) => {
  // 고드아이드의 경우 imgurl이 다름.
  if (item.name.includes("고드아이드")) {
    return `${imgUrl}img/new_icon/06_pc_equipitem/00_common/01_weapon/${String(
      item.id,
    ).padStart(8, "0")}.webp`;
  } else {
    return `${imgUrl}images/items/${String(item.id).padStart(8, "0")}.webp`;
  }
};

export const formatName = (item) => {
  let name = item.name;
  const romanNumerals = {
    16: "Ⅰ",
    17: "Ⅱ",
    18: "Ⅲ",
    19: "Ⅳ",
    20: "Ⅴ",
    1: "Ⅰ",
    2: "Ⅱ",
    3: "Ⅲ",
    4: "Ⅳ",
    5: "Ⅴ",
  };

  // minEnhance가 16,17,18,19,20 또는 maxEnhance가 1,2,3,4,5인 경우 로마숫자로 변환
  const formatEnhance = (enhance) => {
    return romanNumerals[enhance] || enhance;
  };

  if (item.maxEnhance > 0) {
    if (item.minEnhance === item.maxEnhance) {
      name += ` ${formatEnhance(item.maxEnhance)}강`;
    } else {
      name += ` ${formatEnhance(item.minEnhance)}~${formatEnhance(
        item.maxEnhance,
      )}강`;
    }
  }
  return name;
};
