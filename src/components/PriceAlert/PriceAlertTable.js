import React, { useState } from "react";
import { DataTd, DataTh } from "../item/ItemsDataTable";
import FavoriteButton from "../favItem/FavoriteButton";
import { formatDate } from "../item/ItemsDataTable";
import { LuRefreshCcw } from "react-icons/lu";
import EditPriceAlertModal from "./modal/EditPriceAlertModal";
import DataTdName from "../item/DataTdName";

/**
 * @param {priceAlerts} 가격알림 정보
 * @param {items} 가격알림 등록된 items들의 정보
 * @param {onItemUpdate} 아이템 가격 정보 업데이트
 * @returns
 */
export default function PriceAlertTable({
  priceAlerts,
  items,
  onItemUpdate,
  onDeleteAlert,
}) {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleOpenModal = (alert) => {
    setSelectedAlert(alert);
  };

  const handleCloseModal = () => {
    setSelectedAlert(null);
  };

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
              <DataTh scope="col">알림 가격</DataTh>
              <DataTh scope="col">가격 알림 수정</DataTh>
              <DataTh scope="col">가격 업데이트 시간</DataTh>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {items.length > 0 ? (
              items.map((item) => {
                const alert = priceAlerts.find(
                  (alert) =>
                    alert.itemId === item.id && alert.itemSid === item.sid,
                );

                return (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-100 border-b-2 border-gray-100"
                  >
                    <DataTd className="flex">
                      <DataTdName item={item} />
                    </DataTd>
                    <DataTd>{item.basePrice}</DataTd>
                    <DataTd>{item.currentStock}</DataTd>
                    <DataTd>
                      <FavoriteButton item={item} />
                    </DataTd>
                    <DataTd>
                      {alert ? alert.priceThreshold : "가격알림 없음"}
                    </DataTd>
                    <DataTd>
                      <button
                        onClick={() => handleOpenModal(alert)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => onDeleteAlert(alert._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2"
                      >
                        삭제
                      </button>
                    </DataTd>
                    <DataTd className="flex items-center">
                      <div className="flex items-center">
                        <span className="mr-1">
                          {formatDate(item.updateAt)}
                        </span>
                        <LuRefreshCcw
                          className="cursor-pointer pl-1 text-lg"
                          onClick={() => onItemUpdate(item.name, item)}
                        />
                      </div>
                    </DataTd>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center"
                  style={{ height: "100px" }}
                >
                  가격 알림한 아이템이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedAlert && (
        <EditPriceAlertModal
          isOpen={!!selectedAlert}
          onRequestClose={handleCloseModal}
          alert={selectedAlert}
        />
      )}
    </div>
  );
}
