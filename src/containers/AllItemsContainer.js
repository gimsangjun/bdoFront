import React, { useEffect } from "react";
import TableHeader from "../components/item/TableHeader";
import TablePagination from "../components/item/TablePagination";
import ItemsDataTable from "../components/item/ItemsDataTable";
import SidebarContainer from "./SidebarContainer";
import { useDispatch, useSelector } from "react-redux";
import { getItemsByQuery, updateItems } from "../modules/item";
import { useLocation } from "react-router-dom";

export default function AllItemsContainer() {
  // TODO, redux, state를 새로고침해도 유지 시키는 방법, 로컬 스토리지 인가 브라우저에 저장?
  const { loading, items, query, pages, currentPage, totalCount } = useSelector(
    (state) => state.item,
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemSearchValue = queryParams.get("item_search_value");

  const dispatch = useDispatch();

  /**
   * 10000개가 넘는 아이템을  pagination 기능을 처리해야 되고, 거기에 카테고리 검색을 해야한다.
   * 백엔드 코드를 살펴본 결과, 카테고리 검색, 이름 검색 API가 나누어져 있어서 복잡하다.
   * 결론은 프론트 측에서 쿼리를 하나로 모아 보내고, 백엔드 측에서 그 쿼리르 바탕으로 동적쿼리를 생성한다.
   * 노션 - pagination 문제
   * 링크 - https://whimsical-dugout-2c6.notion.site/Pagination-79501666c80a489c991ddd35b7d9afdb?pvs=4
   */
  useEffect(() => {
    // 메인 페이지에서 검색해서 넘어왔을 경우.
    if (itemSearchValue) {
      const newQuery = { name: itemSearchValue };
      dispatch(getItemsByQuery(newQuery, currentPage));
    } else {
      dispatch(getItemsByQuery(query, currentPage));
    }
  }, []); // 빈괄호없애면 일남. 계속요청함.

  const handleCategoryClick = (mainCategory, subCategory) => {
    // TODO: 아이템 이름 검색하고, 카테고리 추가하는것도 해봐야할듯.
    const newQuery = {
      mainCategory,
      subCategory,
    };
    dispatch(getItemsByQuery(newQuery, 1));
  };

  const handleItemUpdate = (name) => {
    dispatch(updateItems(name));
  };

  const handleTableHeaderSearch = async (itemName) => {
    const newQuery = {
      name: itemName,
    };
    dispatch(getItemsByQuery(newQuery, 1));
  };

  const setCurrentPage = async (pageNumber) => {
    dispatch(getItemsByQuery(query, pageNumber));
  };

  return (
    <div className="w-full h-full bg-gray-200">
      {/* TODO: Bdolytics 보고 반응형웹 해보기. */}
      <div className="w-1210 mx-auto flex flex-col">
        {/* 테이블 헤더 시작 */}
        <TableHeader
          tableName={"전체 아이템"}
          itemSearchValue={itemSearchValue}
          onTableHeaderSearch={handleTableHeaderSearch}
        />
        <div className="flex">
          <SidebarContainer onCategoryClick={handleCategoryClick} />
          <div className="bg-white flex flex-grow justify-center items-center flex-col rounded-lg">
            {loading ? (
              <div className="flex justify-center items-center w-full h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* 데이터 부분 */}
                <ItemsDataTable items={items} onItemUpdate={handleItemUpdate} />
                {/* 페이지네이션 추가 */}
                <TablePagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  setCurrentPage={setCurrentPage}
                  totalPages={pages}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
