import React from "react";
import TableHeader from "../components/item/TableHeader";
import { useSelector } from "react-redux";
import ItemsTable from "../components/item/ItemsTable";

// TODO: 즐겨찾기한 아이템 전체 새로고침 버튼
export default function FavItemsContainer() {
  const { favItems, loading } = useSelector((state) => state.itemFav);
  const { loading: updating } = useSelector((state) => state.item); // 가격 업데이트

  return (
    <div className="w-full bg-gray-200 min-h-screen">
      <div className="w-1210 mx-auto flex flex-col">
        <TableHeader tableName={"관심 아이템"} />
        <div className="bg-white flex flex-grow justify-center items-center flex-col rounded-lg">
          {loading || updating ? (
            <div className="flex justify-center items-center w-full h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <ItemsTable items={favItems.map((item) => item.stockDetail)} />
          )}
        </div>
      </div>
    </div>
  );
}
