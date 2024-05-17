import React from "react";
import tw from "twin.macro";
import FavoriteButton from "./FavoriteButton";
import { LuRefreshCcw } from "react-icons/lu";

const imgUrl = "https://cdn.bdolytics.com/";

export default function ItemsData({ items, onFavoriteClick, favItems, onItemUpdate }) {
  return (
    // TODO 자식을 벗어나는 부분에 대해서는 배경색깔이 바뀌지않음.(아래로 스크롤 하면 보임.)
    <div className="bg-gray-200 flex justify-center items-center flex-col w-full">
      {/* 데이터 부분 시작. , w-full 이유 : width맞춰줄려고. */}
      <div className="rounded-lg w-full">
        {/* TODO : min-w-full의 의미 */}
        <table className="min-w-full">
          <thead className="bg-gray-200 ">
            <tr>
              <DataTh scope="col">이름</DataTh>
              <DataTh scope="col">현재 거래소 가격</DataTh>
              <DataTh scope="col">현재 매물</DataTh>
              <DataTh scope="col">일일 거래량</DataTh>
              <DataTh scope="col">즐겨 찾기</DataTh>
              <DataTh scope="col">가격 알림</DataTh>
              <DataTh scope="col">가격 업데이트 시간</DataTh>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {/* items를 매핑하여 각 행을 생성 */}
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100 border-b-2 border-gray-100">
                  <DataTd className="flex">
                    <img
                      src={foramtImgUrl(item)}
                      alt={item.name}
                      style={{ width: "28px", height: "28px" }}
                    />
                    {formatName(item)}
                  </DataTd>
                  <DataTd>{new Intl.NumberFormat().format(item.basePrice)}</DataTd>
                  <DataTd>{new Intl.NumberFormat().format(item.currentStock)}</DataTd>
                  <DataTd>아직없음</DataTd>
                  <DataTd>
                    <FavoriteButton
                      item={item}
                      onFavoriteClick={onFavoriteClick}
                      isFavorite={checkIsFavorite(favItems, item)}
                    />
                  </DataTd>
                  <DataTd>아직없음</DataTd>
                  <DataTd className="flex items-center">
                    {formatDate(item.updateAt)}
                    <LuRefreshCcw
                      className="cursor-pointer pl-1 text-lg"
                      onClick={() => onItemUpdate(item.name, item)}
                    />
                  </DataTd>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center" style={{ height: "100px" }}>
                  아이템이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const formatName = (item) => {
  let name = item.name;
  if (item.maxEnhance > 0) {
    if (item.minEnhance === item.maxEnhance) name += ` ${item.maxEnhance}강`;
    else name += ` ${item.minEnhance}~${item.maxEnhance}강`;
  }
  return name;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const foramtImgUrl = (item) => {
  // 고드아이드의 경우 imgurl이 다름.
  if (item.name.includes("고드아이드")) {
    return `${imgUrl}img/new_icon/06_pc_equipitem/00_common/01_weapon/${String(item.id).padStart(
      8,
      "0"
    )}.webp`;
  } else {
    return `${imgUrl}images/items/${String(item.id).padStart(8, "0")}.webp`;
  }
};

function checkIsFavorite(favItems, item) {
  if (!favItems) return false;
  return favItems.some((fav) => fav.id === item.id && fav.sid === item.sid);
}

// whitespace-nowrap, col이 2줄로 안보이게함. 무조건 한줄
const DataTh = tw.th`px-6 py-3 whitespace-nowrap text-center text-xs font-medium text-gray-500 bg-gray-100 uppercase tracking-wider`;
const DataTd = tw.td`px-6 py-4 whitespace-nowrap text-center`;
