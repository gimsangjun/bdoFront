import React, { useState, useEffect } from "react";
import ItemAPI from "../utils/itemAPI";
import TableHeader from "../components/item/TableHeader";
import Category from "../components/item/Category";
import TablePagination from "../components/item/TablePagination";
import ItemsData from "../components/item/ItemsData";

export default function AllItemsContainer() {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      // const response = await getItemsByPage(currentPage).data; 가 안되는 이유는?
      // => 호출 후에 .data 속성을 직접 접근하는 것이 아닌, 반환된 Promise의 결과를 기다리지 않고 바로 .data 속성에 접근하려고 하기 때문
      const response = await await ItemAPI.getItemsByPage(currentPage);
      setItems(response.data.itemStocks);
      setTotalCount(response.data.totalCount);
      // console.log("item Table :", response.data); // -> 얘는 정상출력됨.
      // items가 빈배열로 출력되는 이유는?
      // => 비동기적으로 동작하며, setItems 함수가 호출되어도 items 상태가 즉시 업데이트되지 않기 때문
    };

    fetchItems();
  }, [currentPage]);

  return (
    <div className="w-full h-full bg-white">
      <div className="w-1080 mx-auto p-2 bg-gray-200 flex justify-center items-center flex-col my-5 rounded-lg">
        {/* 테이블 헤더 시작 */}
        <TableHeader />
        {/* 카테고리 시작 */}
        <Category />
        {/* 데이터 부분 */}
        <ItemsData items={items} />
        {/* 페이지네이션 추가 */}
        <TablePagination
          currentPage={currentPage}
          totalCount={totalCount}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
