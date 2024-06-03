import React, { useState } from "react";
import tw from "twin.macro";
import { LuRefreshCcw } from "react-icons/lu";
import PriceAlertModal from "../modal/PriceAlertModal";
import FavoriteButton from "./FavoriteButton";
import DataTdName from "./DataTdName";
import EditPriceAlertModal from "../modal/EditPriceAlertModal";
import { useDispatch } from "react-redux";
import { updateItems } from "../../modules/item";

/**
 * @param {items} 테이블에 보여줄 데이터
 * @param {showModifyAlertButton} [boolean] 값에 따라 가격알림 버튼 등록 또는 수정
 * @
 */
const ItemsTable = ({ items, showModifyAlertButton = false }) => {
  // 아이템 등록 알림용 modal과 item
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();

  const openAlertModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeAlertModal = () => {
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
            <DataTh scope="col">즐겨 찾기</DataTh>
            <DataTh scope="col">
              {!showModifyAlertButton ? "가격 알림" : "가격 알림 수정"}
            </DataTh>
            <DataTh scope="col">가격 업데이트 날짜</DataTh>
          </tr>
        </thead>
        <tbody className="bg-white divide-gray-200">
          {items.length > 0 ? (
            items.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 border-b-2 border-gray-100"
                >
                  {/* 아이템 이름 */}
                  <DataTd>
                    <DataTdName item={item} />
                  </DataTd>
                  {/* 현재 거래소 가격 */}
                  <DataTd>
                    {new Intl.NumberFormat().format(
                      item.lastSoldPrice ? item.lastSoldPrice : item.basePrice,
                    )}
                  </DataTd>
                  {/* 현재 매물 */}
                  <DataTd>
                    {new Intl.NumberFormat().format(item.currentStock)}
                  </DataTd>
                  {/* 즐겨찾기 추가 */}
                  <DataTd>
                    <FavoriteButton item={item} />
                  </DataTd>
                  <DataTd>
                    {/* 가격 알림 */}
                    {showModifyAlertButton ? (
                      <span>
                        {new Intl.NumberFormat().format(item.priceThreshold)}
                      </span>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={() => openAlertModal(item)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
                    >
                      {!showModifyAlertButton ? "등록" : "수정"}
                    </button>
                  </DataTd>
                  {/* 아이템 가격 업데이트 날짜 */}
                  <DataTd className="flex items-center">
                    <span className="mr-1">{formatDate(item.updateAt)}</span>
                    <LuRefreshCcw
                      className="cursor-pointer pl-1 text-lg"
                      onClick={() => dispatch(updateItems(item.name))}
                    />
                  </DataTd>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center"
                style={{ height: "100px" }}
              >
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!showModifyAlertButton ? (
        <PriceAlertModal
          isOpen={modalIsOpen}
          onRequestClose={closeAlertModal}
          item={selectedItem}
        />
      ) : (
        <EditPriceAlertModal
          isOpen={modalIsOpen}
          onRequestClose={closeAlertModal}
          item={selectedItem}
        />
      )}
    </div>
  );
};

const formatDate = (dateString) => {
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

export default ItemsTable;
