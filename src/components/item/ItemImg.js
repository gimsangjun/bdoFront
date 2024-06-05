import React from "react";
import { formatImgUrl, getItemColor } from "./DataTdName";

// 아이템 위에 강화단계예 따른, 로마숫자 표시.
export default function ItemImg({ item }) {
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
    fontSize: "1.5rem",
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
    <div className={`relative ${getItemColor(item)} border-[2px] mr-2 z-10`}>
      <img src={formatImgUrl(item)} alt="item" />
      <span style={enhanceLevelStyle}>{enhanceLevel}</span>
    </div>
  );
}
