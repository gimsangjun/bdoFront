import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 import
import ItemAPI from "../../../utils/itemAPI";

export default function ItemListContainer() {
  const [searchName, setSearchName] = useState(""); // 이름 검색어를 저장하는 상태
  const [searchId, setSearchId] = useState(""); // ID 검색어를 저장하는 상태
  const [searchMainCategory, setSearchMainCategory] = useState(""); // mainCategory 검색어를 저장하는 상태
  const [items, setItems] = useState([]); // 검색 결과로 받아온 아이템 리스트를 저장하는 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 저장하는 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수를 저장하는 상태
  const [limit, setLimit] = useState(10); // 페이지당 아이템 수를 저장하는 상태

  const navigate = useNavigate();

  const handleSearchNameChange = (e) => setSearchName(e.target.value);
  const handleSearchIdChange = (e) => setSearchId(e.target.value);
  const handleSearchMainCategoryChange = (e) =>
    setSearchMainCategory(e.target.value);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1); // 페이지당 아이템 수가 변경되면 첫 페이지로 이동
  };

  const fetchItems = async () => {
    try {
      const query = {
        name: searchName,
        id: searchId,
        mainCategory: searchMainCategory,
        limit: limit,
      };
      // 필드가 비어 있으면 쿼리에서 제거
      Object.keys(query).forEach((key) => {
        if (query[key] === "" || query[key] === undefined) {
          delete query[key];
        }
      });
      const data = await ItemAPI.getItemsByQuery(query, currentPage);
      setItems(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("아이템 리스트를 가져오는 중 오류가 발생했습니다.", error);
    }
  };

  // 페이지나 검색 조건이 변경될 때 아이템을 다시 가져오기
  useEffect(() => {
    fetchItems();
  }, [currentPage, searchName, searchId, searchMainCategory, limit]);

  // 모든 검색 입력 필드를 비우는 함수
  const handleResetSearch = () => {
    setSearchName("");
    setSearchId("");
    setSearchMainCategory("");
  };

  // 아이템 생성 페이지로 이동하는 함수
  const handleCreateItem = () => {
    navigate("/admin/item/create");
  };

  // 아이템 클릭하면 아이템 상세 페이지로
  const handleItemClick = (id, sid) => {
    navigate(`/admin/item/detail?id=${id}&sid=${sid}`);
  };

  return (
    <div className="min-w-[960px] p-6 m-6 bg-white shadow-lg rounded-lg mx-auto">
      {/* 검색 바 */}
      <div className="mb-4">
        <input
          type="text"
          value={searchName}
          onChange={handleSearchNameChange}
          placeholder="아이템 이름을 입력하세요"
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          value={searchId}
          onChange={handleSearchIdChange}
          placeholder="아이템 ID를 입력하세요"
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          value={searchMainCategory}
          onChange={handleSearchMainCategoryChange}
          placeholder="메인 카테고리를 입력하세요"
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={fetchItems}
          className="mt-2 p-2 bg-blue-500 text-white rounded mr-2"
        >
          검색
        </button>
        <button
          onClick={handleResetSearch}
          className="mt-2 p-2 bg-gray-500 text-white rounded mr-2"
        >
          검색 초기화
        </button>
        <button
          onClick={handleCreateItem}
          className="mt-2 p-2 bg-green-500 text-white rounded"
        >
          아이템 생성
        </button>
      </div>

      {/* 페이지당 아이템 수 선택 */}
      <div className="mb-4">
        <label htmlFor="limit" className="mr-2">
          페이지당 아이템 수:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          className="p-2 border rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* 검색 결과로 받아온 아이템 리스트 표시 */}
      {items.length > 0 ? (
        <table className="mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">아이템 이름</th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">SID</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">Image URL</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td
                  className="p-2 border cursor-pointer text-blue-500"
                  onClick={() => handleItemClick(item.id, item.sid)}
                >
                  {item.name}
                </td>
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.sid}</td>
                <td className="p-2 border whitespace-pre-wrap">
                  {item.mainCategory}, {item.subCategory}
                </td>
                <td className="p-2 border">{item.grade}</td>
                {/* break-word는 단어가 셀의 너비를 초과하면 강제로 줄바꿈 */}
                <td className="p-2 border max-w-[250px] break-words">
                  {item.imgUrl}
                </td>
                <td className="p-2 border">{item.type}</td>
                <td className="p-2 border max-w-[250px] break-words">
                  {item.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        searchName && <div className="mt-4">검색된 아이템이 없습니다.</div>
      )}

      {/* 페이지네이션 버튼 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 p-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            이전
          </button>
          <span className="p-2">
            페이지 {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2 p-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
