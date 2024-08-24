import React from "react";
import { getItemColor } from "./DataTdName";

const imgUrl = "https://cdn.bdolytics.com/";

// 아이템 위에 강화단계예 따른, 로마숫자 표시.
export default function ItemImg({ item, className, style, enhanceLevelSize }) {
  const enhanceLevelStyle = {
    display: "flex",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    lineHeight: "10px",
    fontWeight: 600,
    justifyContent: "center",
    alignItems: "center",
    fontSize: enhanceLevelSize || "1.5rem",
    WebkitTextStrokeWidth: "1px",
    WebkitTextStrokeColor: "#f56565",
  };

  const getRomanNumeral = (sid) => {
    if (sid >= 1 && sid <= 5) return ["I", "II", "III", "IV", "V"][sid - 1];
    if (sid >= 16 && sid <= 20) return ["I", "II", "III", "IV", "V"][sid - 16];
    return "";
  };

  const enhanceLevel = getRomanNumeral(item.sid);

  return (
    // 얘만 z-index가 이상한지 스크롤 햇을때 가려져야하는데, 맨위에 나타나 뭐가 문제일까? 얘와 형제인 얘들은 정상적으로 동작함.
    // z-index는 부모 요소의 position 속성에 영향을 받습니다. 부모 요소가 position: relative, absolute, fixed 중 하나여야 z-index가 작동
    // 부모가 absolute라서 평소와 다르게 동작해서 스크롤했을때 가려지지 않는듯.
    <div
      className={`relative ${getItemColor(
        item,
      )} border-[2px] mr-2 ${className} z-1`}
      style={style}
    >
      <img
        src={formatImgUrl(item)}
        alt="item"
        style={{ width: "100%", height: "100%" }}
      />
      <span style={enhanceLevelStyle}>{enhanceLevel}</span>
    </div>
  );
}

export const formatImgUrl = (item) => {
  const defaultImgUrl = `${imgUrl}images/items/${String(item.id).padStart(
    8,
    "0",
  )}.webp`;

  if (item.imgUrl) {
    return item.imgUrl;
  }
  return defaultImgUrl;
};
