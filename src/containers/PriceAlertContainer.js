import React, { useEffect, useState } from "react";
import TableHeader from "../components/item/TableHeader";
import { useDispatch, useSelector } from "react-redux";
import PriceAlertTable from "../components/PriceAlert/PriceAlertTable";
import ItemAPI from "../utils/itemAPI";
import { updateItems } from "../modules/item";
import { removePriceAlert } from "../modules/priceAlert";

export default function PriceAlertContainer() {
  const { priceAlerts, loading: priceAlertLoading } = useSelector(
    (state) => state.priceAlert,
  );
  const { loading: itemLoading } = useSelector((state) => state.item);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  // TODO: App.js를 거치지 않고, 바로 특정페이지로 가는 경우 문제가 생기는듯. => 체크해봐야됨. App.js
  useEffect(() => {
    // priceAlerts에 있는 데이터들의 가격을 가져오기 위함.
    const fetchItems = async () => {
      try {
        const ids = priceAlerts.map((alert) => alert.itemId);
        const sids = priceAlerts.map((alert) => alert.itemSid);

        const items = await ItemAPI.getItemsByIdandSid(ids, sids);
        setItems(items);
      } catch (error) {
        console.error("Error fetching items for price alerts:", error);
      }
    };

    if (priceAlerts.length > 0) {
      fetchItems();
    }
  }, [priceAlerts]);

  const handleItemUpdate = async (name) => {
    try {
      const updatedItems = await dispatch(updateItems(name, items));

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

  const handleDeleteAlert = async (alertId) => {
    try {
      await dispatch(removePriceAlert(alertId));
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
