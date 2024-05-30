import React, { useEffect, useState, useCallback } from "react";
import TableHeader from "../components/item/TableHeader";
import { useDispatch, useSelector } from "react-redux";
import PriceAlertTable from "../components/priceAlert/PriceAlertTable";
import ItemAPI from "../utils/itemAPI";
import { fetchPriceAlerts, removePriceAlert } from "../modules/priceAlert";

export default function PriceAlertContainer() {
  const { priceAlerts, loading: priceAlertLoading } = useSelector(
    (state) => state.priceAlert,
  );
  const { user } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);
  const [updating, setUpdating] = useState(false); // 로딩 상태 추가
  const dispatch = useDispatch();

  // 초기데이터 로딩
  useEffect(() => {
    if (user) {
      dispatch(fetchPriceAlerts());
    }
  }, [dispatch, user]);

  // alert에 등록된 가격 정보들 가져오기
  const fetchItems = useCallback(async () => {
    try {
      if (priceAlerts.length === 0) {
        setItems([]);
        return;
      }

      const items = priceAlerts.map((alert) => ({
        id: alert.itemId,
        sid: alert.itemSid,
      }));

      const fetchedItems = await ItemAPI.getItemsByIdandSid(items);
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items for price alerts:", error);
    }
  }, [priceAlerts]);

  useEffect(() => {
    fetchItems();
  }, [priceAlerts, fetchItems]);

  // 아이템 가격 정보 업데이트
  const handleItemUpdate = async (name) => {
    try {
      setUpdating(true); // 로딩 상태 시작
      const { updateItems } = await ItemAPI.updateItemByName(name);

      // 아이템을 업데이트 후 업데이트된 아이템만 업데이트
      setItems((prevItems) =>
        prevItems.map(
          (item) =>
            updateItems.find(
              (updatedItem) =>
                updatedItem.id === item.id && updatedItem.sid === item.sid,
            ) || item,
        ),
      );
      setUpdating(false); // 로딩 상태 종료
    } catch (error) {
      console.error("Error updating items:", error);
      setUpdating(false); // 로딩 상태 종료
    }
  };

  const handleDeleteAlert = (alertId) => {
    try {
      dispatch(removePriceAlert(alertId));
    } catch (error) {
      console.error("Error deleting price alert:", error);
    }
  };

  return (
    <div className="w-full bg-gray-200 h-screen">
      <div className="w-1210 mx-auto flex flex-col">
        <TableHeader tableName={"가격 알림"} />
        <div className="bg-white flex flex-grow justify-center items-center flex-col rounded-lg">
          {priceAlertLoading || updating ? (
            // Display a spinner or loading message while loading is true
            <div className="flex justify-center items-center w-full h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <PriceAlertTable
              priceAlerts={priceAlerts}
              items={items}
              onItemUpdate={handleItemUpdate}
              onDeleteAlert={handleDeleteAlert}
            />
          )}
        </div>
      </div>
    </div>
  );
}
