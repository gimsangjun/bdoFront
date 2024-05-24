import React, { useEffect, useState } from "react";
import TableHeader from "../components/item/TableHeader";
import { useSelector } from "react-redux";
import PriceAlertTable from "../components/PriceAlert/PriceAlertTable";
import ItemAPI from "../utils/itemAPI";

export default function PriceAlertContainer() {
  const { priceAlerts, loading } = useSelector((state) => state.priceAlert);
  const [items, setItems] = useState([]);

  // TODO: 로딩을 따로 넣어주지 않아서 오류가 생기는듯,
  // TODO: App.js를 거치지 않고, 바로 특정페이지로 가는 경우 문제가 생기는듯. => 체크해봐야됨. App.js
  useEffect(() => {
    // priceAlerts에 있는 데이터들의 가격을 가져오기 위함.
    const fetchItems = async () => {
      try {
        const ids = priceAlerts.map((alert) => alert.itemId);
        const sids = priceAlerts.map((alert) => alert.itemSid);

        const items = await ItemAPI.getItemsByIdandSid(ids, sids);
        console.log("fetchItems", items);
        setItems(items);
      } catch (error) {
        console.error("Error fetching items for price alerts:", error);
      }
    };

    if (priceAlerts.length > 0) {
      fetchItems();
    }
  }, [priceAlerts]);

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="w-1210 mx-auto flex flex-col">
        <TableHeader tableName={"가격 알림"} />
        <div className="bg-white flex flex-grow justify-center items-center flex-col rounded-lg">
          {loading ? (
            // Display a spinner or loading message while loading is true
            <div className="flex justify-center items-center w-full h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <PriceAlertTable priceAlerts={priceAlerts} items={items} />
          )}
        </div>
      </div>
    </div>
  );
}
