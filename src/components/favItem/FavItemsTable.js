import React from "react";
import tw from "twin.macro";
import { foramtImgUrl, formatName } from "../item/ItemsDataTable";
import FavoriteButton from "./FavoriteButton";

export default function FavItemsTable({ favItems }) {
  return (
    <div className="bg-gray-200 flex justify-center items-center flex-col w-full">
      <div className="rounded-lg w-full">
        <table className="min-w-full">
          <thead className="bg-gray-200 ">
            <tr>
              <DataTh scope="col">이름</DataTh>
              <DataTh scope="col">현재 거래소 가격</DataTh>
              <DataTh scope="col">현재 매물</DataTh>
              <DataTh scope="col">즐겨 찾기</DataTh>
              <DataTh scope="col">가격 알림</DataTh>
              <DataTh scope="col">가격 업데이트 시간</DataTh>
              <DataTh scope="col">가격 업데이트</DataTh>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {favItems.length > 0 ? (
              favItems.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 border-b-2 border-gray-100"
                >
                  <DataTd className="flex">
                    <img
                      src={foramtImgUrl(item)}
                      alt={item.name}
                      style={{ width: "28px", height: "28px" }}
                    />
                    {formatName(item)}
                  </DataTd>
                  <DataTd>{item.stockDetail.basePrice}</DataTd>
                  <DataTd>{item.stockDetail.currentStock}</DataTd>
                  <DataTd>
                    <FavoriteButton item={item.stockDetail} />
                  </DataTd>
                  <DataTd>가격알림 X</DataTd>
                  <DataTd>{item.stockDetail.updateAt}</DataTd>
                  <DataTd>가격업데이트 버튼 X</DataTd>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center"
                  style={{ height: "100px" }}
                >
                  즐겨 찾는 항목이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// whitespace-nowrap, col이 2줄로 안보이게함. 무조건 한줄
const DataTh = tw.th`px-6 py-3 whitespace-nowrap text-center text-xs font-medium text-gray-500 bg-gray-100 uppercase tracking-wider`;
const DataTd = tw.td`px-6 py-4 whitespace-nowrap text-center`;
