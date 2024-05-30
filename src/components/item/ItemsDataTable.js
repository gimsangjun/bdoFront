import React, { useState } from "react";
import tw from "twin.macro";
import FavoriteButton from "../favItem/FavoriteButton";
import { LuRefreshCcw } from "react-icons/lu";
import PriceAlertModal from "../priceAlert/modal/PriceAlertModal";
import DataTdName from "./DataTdName";

// TODO, ItemsDataTable, FavItemsTable, PriceAlertTable 합칠수 있는 지피티한테 물어봐야할듯.
export default function ItemsDataTable({ items, onItemUpdate }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center flex-col w-full">
      {/* 데이터 부분 시작.*/}
      <table className="rounded-lg w-full">
        <thead className="bg-gray-200 sticky top-48">
          <tr>
            <DataTh scope="col">이름</DataTh>
            <DataTh scope="col">현재 거래소 가격</DataTh>
            <DataTh scope="col">현재 매물</DataTh>
            {/* <DataTh scope="col">일일 거래량</DataTh> */}
            <DataTh scope="col">즐겨 찾기</DataTh>
            <DataTh scope="col">가격 알림</DataTh>
            <DataTh scope="col">가격 업데이트 시간</DataTh>
          </tr>
        </thead>
        <tbody className="bg-white divide-gray-200">
          {/* items를 매핑하여 각 행을 생성 */}
          {items.length > 0 ? (
            items.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 border-b-2 border-gray-100"
              >
                <DataTd>
                  <DataTdName item={item} />
                </DataTd>
                <DataTd>
                  {new Intl.NumberFormat().format(item.basePrice)}
                </DataTd>
                <DataTd>
                  {new Intl.NumberFormat().format(item.currentStock)}
                </DataTd>
                {/* <DataTd>
                  아직없음
                </DataTd> */}
                <DataTd>
                  <FavoriteButton item={item} />
                </DataTd>
                <DataTd>
                  <button
                    onClick={() => openModal(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    알림 등록
                  </button>
                </DataTd>
                <DataTd>
                  <div className="flex items-center">
                    <span className="mr-1">{formatDate(item.updateAt)}</span>
                    {/* TODO: 나중에는 클릭한 row만 로딩되게 추가할수도 있을듯. */}
                    <LuRefreshCcw
                      className="cursor-pointer pl-1 text-lg"
                      onClick={() => onItemUpdate(item.name, item)}
                    />
                  </div>
                </DataTd>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center"
                style={{ height: "100px" }}
              >
                아이템이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <PriceAlertModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        item={selectedItem}
      />
    </div>
  );
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// whitespace-nowrap, col이 2줄로 안보이게함. 무조건 한줄
export const DataTh = tw.th`py-1 whitespace-nowrap text-left text-base font-medium text-gray-500 bg-gray-100 uppercase tracking-wider`;
export const DataTd = tw.td`py-1 whitespace-nowrap text-left text-base`;
