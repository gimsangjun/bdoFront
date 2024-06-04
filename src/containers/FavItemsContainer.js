import React, { useCallback, useEffect, useState } from "react";
import TableHeader from "../components/item/TableHeader";
import { useSelector } from "react-redux";
import ItemsTable from "../components/item/ItemsTable";
import ItemAPI from "../utils/itemAPI";

export default function FavItemsContainer() {
  const { favItems, loading: favLoading } = useSelector(
    (state) => state.itemFav,
  ); // App.js에서 바로 업데이트함.
  const { status, loading: itemUpdateLoading } = useSelector(
    (state) => state.item,
  );
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // 실제 가격 정보 가져오기.
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      if (favItems.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      const _items = favItems.map((item) => ({
        id: item.id,
        sid: item.sid,
      }));

      const fetchedItems = await ItemAPI.getItemsByIdandSid(_items);
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching Items for favItems:", error);
    } finally {
      setLoading(false);
    }
  }, [favItems]);

  useEffect(() => {
    fetchItems();
  }, [favItems, fetchItems, itemUpdateLoading]);

  return (
    <div className="w-1080 mx-auto">
      <TableHeader tableName={"관심 아이템"} />
      <div className="bg-white flex flex-grow justify-center items-center flex-col rounded-lg">
        {favLoading || itemUpdateLoading || loading ? (
          <div className="flex justify-center items-center w-full h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <ItemsTable items={items} />
        )}
      </div>
    </div>
  );
}
