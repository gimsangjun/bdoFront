import React, { useEffect, useState, useCallback } from "react";
import TableHeader from "../components/item/TableHeader";
import { useDispatch, useSelector } from "react-redux";
import ItemAPI from "../utils/itemAPI";
import { fetchPriceAlerts } from "../modules/priceAlert";
import ItemsTable from "../components/item/ItemsTable";

// TODO: 가격알림한 아이템 전체 새로고침 버튼
export default function PriceAlertContainer() {
  const { priceAlerts, loading: priceAlertLoading } = useSelector(
    (state) => state.priceAlert,
  );
  const { loading: updating } = useSelector((state) => state.item); // 가격 업데이트
  const { user } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]); // alert 가격 정보들
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

  return (
    <div className="w-full bg-gray-200">
      <div className="w-1210 mx-auto flex flex-col">
        <TableHeader tableName={"가격 알림"} />
        <div className="bg-white flex flex-grow justify-center items-center flex-col rounded-lg">
          {priceAlertLoading || updating ? (
            <div className="flex justify-center items-center w-full h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <ItemsTable items={items} showModifyAlertButton={true} />
          )}
        </div>
      </div>
    </div>
  );
}
