import React, { useState, useEffect } from "react";

export default function ItemsTable({ getItemsByPage }) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      // const response = await getItemsByPage(currentPage).data; 가 안되는 이유는?
      // => 호출 후에 .data 속성을 직접 접근하는 것이 아닌, 반환된 Promise의 결과를 기다리지 않고 바로 .data 속성에 접근하려고 하기 때문
      const response = await getItemsByPage(currentPage);
      setItems(response.data.itemStocks);
      // console.log("item Table :", response.data); // -> 얘는 정상출력됨.
      // items가 빈배열로 출력되는 이유는?
      // => 비동기적으로 동작하며, setItems 함수가 호출되어도 items 상태가 즉시 업데이트되지 않기 때문
    };

    fetchItems();
  }, [currentPage, getItemsByPage]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              이름
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              현재 거래소 가격
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              일일 거래량
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              현재 매물
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              가격 업데이트 시간
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* items를 매핑하여 각 행을 생성 */}
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
              <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
              <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
              <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이지네이션 추가 */}
      <div className="flex justify-end">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          이전 페이지
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
}
