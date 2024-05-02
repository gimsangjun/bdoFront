import React, { useState, useEffect } from "react";

export default function ItemsTable({ getItemsByPage }) {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      // const response = await getItemsByPage(currentPage).data; 가 안되는 이유는?
      // => 호출 후에 .data 속성을 직접 접근하는 것이 아닌, 반환된 Promise의 결과를 기다리지 않고 바로 .data 속성에 접근하려고 하기 때문
      const response = await getItemsByPage(currentPage);
      setItems(response.data.itemStocks);
      setTotalCount(response.data.totalCount);
      // console.log("item Table :", response.data); // -> 얘는 정상출력됨.
      // items가 빈배열로 출력되는 이유는?
      // => 비동기적으로 동작하며, setItems 함수가 호출되어도 items 상태가 즉시 업데이트되지 않기 때문
    };

    fetchItems();
  }, [currentPage, getItemsByPage]);

  const totalPages = Math.ceil(totalCount / 30); // 한 페이지에 30개씩 데이터가 나옴.
  console.log("totalCount, totalPages, currentPage", totalCount, totalPages, currentPage);

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationNumbers = () => {
    const paginationNumbers = [];
    let startPage;
    if (currentPage <= 2 || totalPages <= 3) {
      // 맨처음 일경우
      startPage = 1;
    } else if (currentPage >= totalPages - 2) {
      // 마지막 일 경우
      startPage = totalPages - 2;
    } else {
      startPage = currentPage - 1;
    }

    for (let i = startPage; i <= Math.min(startPage + 2, totalPages); i++) {
      paginationNumbers.push(
        <li
          key={i}
          onClick={() => handlePageClick(i)}
          // TODO: 이런식으로 hover효과를 줄수 있다.
          className={`mx-1 py-2 px-3 text-white hover:bg-slate-500 ${
            currentPage === i ? "border-b-2 border-green-500" : ""
          }`}
        >
          {i}
        </li>
      );
    }
    return paginationNumbers;
  };

  return (
    <div className="w-2160 mx-auto flex justify-center items-center flex-col my-5 ">
      <div className="w-full bg-gray-400 flex flex-row rounded bg-base-400 p-2 shadow-lg shadow-black">
        {/* mr-auto:  부모 요소 내에서 자식 요소를 우측으로 밀어내는 데 사용*/}
        <h1 className="mr-auto whitespace-nowrap text-3xl font-bold div">전체 아이템</h1>
        <div className="relative flex items-center justify-center rounded pr-2 bg-base-200 borde opacity-90 hover:opacity-100 h-[40px] py-0.5 pl-2 bg-white">
          {/* TODO: 돋보기 추가 */}
          <input
            autocomplete="off"
            className="h-full w-full border-none bg-transparent px-2 font-medium outline-none placeholder:text-opacity-70  placeholder-gray-400 text-base"
            placeholder="아이템 이름"
          />
        </div>
      </div>
      <div className="overflow-x-auto ">
        {/* TODO : min-w-full의 의미 */}
        <table className="min-w-full">
          <thead className="bg-gray-200 ">
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
                현재 매물
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
                즐겨 찾기
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                가격 알림
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                가격 업데이트 시간
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {/* items를 매핑하여 각 행을 생성 */}
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
                <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
                <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
                <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
                <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
                <td className="px-6 py-4 whitespace-nowrap">아직없음</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 페이지네이션 추가 */}
        <div className="flex justify-center  my-1">
          {/* TODO: shadow 효과를 주면 멋지다. 이거에 대해서 정리하고 다른 방법으로 더 예쁘게 할수 있는 방법이 있는지 알아본다.*/}
          {/* TODO: 어디가로 이동하는 기능을 가진 태그들은 대부분 nav - ul - li 태그 조합을 쓰는듯 하다.(op.gg, bdolytics) */}
          <nav className="rounded border shadow-xl border-gray-700">
            {/* TODO:  <<, >>를 추가해주고 , 얘네들은 각각 맨 처음 페이지와 가장 마지막 페이지로 가게 만들어줘*/}
            <ul className="flex flex-row bg-gray-800">
              <li
                onClick={() => setCurrentPage(1)} // 맨 처음 페이지로 이동
                disabled={currentPage === 1}
                className="text-gray-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2"
              >
                {"<<"}
              </li>
              <li
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2"
              >
                {"<"}
              </li>
              {renderPaginationNumbers()}
              <li
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2"
              >
                {">"}
              </li>
              <li
                onClick={() => setCurrentPage(totalPages)} // 가장 마지막 페이지로 이동
                disabled={currentPage === totalPages}
                className="text-gray-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2"
              >
                {">>"}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
