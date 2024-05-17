import React from "react";
import tw from "twin.macro";

export default function TablePagination({ currentPage, totalCount, setCurrentPage }) {
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

  const totalPages = Math.ceil(totalCount / 30); // 한 페이지에 30개씩 데이터가 나옴.
  // console.log("totalCount, totalPages, currentPage", totalCount, totalPages, currentPage);

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex justify-center  my-1">
      {/* TODO: shadow 효과를 주면 멋지다. 이거에 대해서 정리하고 다른 방법으로 더 예쁘게 할수 있는 방법이 있는지 알아본다.*/}
      {/* 어디가로 이동하는 기능을 가진 태그들은 대부분 nav - ul - li 태그 조합을 쓰는듯 하다.(op.gg, bdolytics) */}
      <nav className="rounded border shadow-xl border-gray-700">
        <ul className="flex flex-row bg-gray-800">
          <Arrow
            onClick={() => setCurrentPage(1)} // 맨 처음 페이지로 이동
            disabled={currentPage === 1}
          >
            {"<<"}
          </Arrow>
          <Arrow onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </Arrow>
          {renderPaginationNumbers()}
          <Arrow
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </Arrow>
          <Arrow
            onClick={() => setCurrentPage(totalPages)} // 가장 마지막 페이지로 이동
            disabled={currentPage === totalPages}
          >
            {">>"}
          </Arrow>
        </ul>
      </nav>
    </div>
  );
}

const Arrow = tw.li`text-gray-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2`;
