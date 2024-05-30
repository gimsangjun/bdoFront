import React, { useState } from "react";
import { DataTh, DataTd } from "../item/ItemsDataTable";
import { formatDate } from "../item/ItemsDataTable";
import FavoriteButton from "./FavoriteButton";
import { LuRefreshCcw } from "react-icons/lu";
import PriceAlertModal from "../priceAlert/modal/PriceAlertModal";
import DataTdName from "../item/DataTdName";

export default function FavItemsTable({ favItems, onItemUpdate }) {
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
      <div className="rounded-lg w-full">
        <table className="min-w-full">
          <thead className="bg-gray-200 sticky top-48">
            <tr>
              <DataTh scope="col">이름</DataTh>
              <DataTh scope="col">현재 거래소 가격</DataTh>
              <DataTh scope="col">현재 매물</DataTh>
              <DataTh scope="col">즐겨 찾기</DataTh>
              <DataTh scope="col">가격 알림</DataTh>
              <DataTh scope="col">가격 업데이트 시간</DataTh>
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
                    <DataTdName item={item.stockDetail} />
                  </DataTd>
                  <DataTd>{item.stockDetail.basePrice}</DataTd>
                  <DataTd>{item.stockDetail.currentStock}</DataTd>
                  <DataTd>
                    <FavoriteButton item={item.stockDetail} />
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
                      <span className="mr-1">
                        {formatDate(item.stockDetail.updateAt)}
                      </span>
                      <LuRefreshCcw
                        className="cursor-pointer pl-1 text-lg"
                        onClick={() =>
                          onItemUpdate(item.stockDetail.name, item.stockDetail)
                        }
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
                  즐겨 찾는 항목이 없습니다.
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
    </div>
  );
}
