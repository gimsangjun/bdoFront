import React, { useEffect, useState, useCallback } from "react";
import TableHeader from "../components/item/TableHeader";
import { useDispatch, useSelector } from "react-redux";
import PriceAlertTable from "../components/PriceAlert/PriceAlertTable";
import ItemAPI from "../utils/itemAPI";
import { updateItems } from "../modules/item";
import { fetchPriceAlerts, removePriceAlert } from "../modules/priceAlert";

export default function PriceAlertContainer() {
  const { priceAlerts, loading: priceAlertLoading } = useSelector(
    (state) => state.priceAlert,
  );
  const { user } = useSelector((state) => state.auth);
  const { loading: itemLoading } = useSelector((state) => state.item);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  // 초기데이터 로딩
  useEffect(() => {
    if (user) {
      dispatch(fetchPriceAlerts());
    }
  }, [dispatch, user]);

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

  // TODO: App.js를 거치지 않고, 바로 특정페이지로 가는 경우 문제가 생기는듯. => 체크해봐야됨. App.js
  useEffect(() => {
    fetchItems();
  }, [priceAlerts, fetchItems]);

  const handleItemUpdate = (name) => {
    try {
      const updatedItems = dispatch(updateItems(name, items));

      // 아이템을 업데이트 후 업데이트된 아이템만 업데이트
      setItems((prevItems) =>
        prevItems.map(
          (item) =>
            updatedItems.find(
              (updatedItem) =>
                updatedItem.id === item.id && updatedItem.sid === item.sid,
            ) || item,
        ),
      );
    } catch (error) {
      console.error("Error updating items:", error);
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
    <div className="w-full h-full bg-gray-200">
      <div className="w-1210 mx-auto flex flex-col">
        <TableHeader tableName={"가격 알림"} />
        <div className="bg-white flex flex-grow justify-center items-center flex-col rounded-lg">
          {priceAlertLoading || itemLoading ? (
            // Display a spinner or loading message while loading is true
            <div className="flex justify-center items-center w-full h-96">
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
