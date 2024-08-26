import React, { useEffect } from "react";
import TableHeader from "../components/item/TableHeader";
import TablePagination from "../components/item/TablePagination";
import ItemsTable from "../components/item/ItemsTable";
import SidebarContainer from "./SidebarContainer";
import { useDispatch, useSelector } from "react-redux";
import { getItemsByQuery } from "../modules/item";
import { useLocation } from "react-router-dom";

export default function AllItemsContainer() {
  // TODO, redux, state를 새로고침해도 유지 시키는 방법, 로컬 스토리지 인가 브라우저에 저장?
  const { loading, items, query, pages, currentPage, totalCount } = useSelector(
    (state) => state.item,
  );
  // 메인페이지에서 아이템을 검색해서 들어오는 경우
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemSearchValue = queryParams.get("item_search_value");

  const dispatch = useDispatch();

  /**
   * 10000개가 넘는 아이템을  pagination 기능을 처리해야 되고, 거기에 카테고리 검색을 해야한다.
   * 백엔드 코드를 살펴본 결과, 카테고리 검색, 이름 검색 API가 나누어져 있어서 복잡하다.
   * 결론은 프론트 측에서 쿼리를 하나로 모아 보내고, 백엔드 측에서 그 쿼리르 바탕으로 동적쿼리를 생성한다.
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
    const newQuery = {
      mainCategory,
      subCategory,
    };
    dispatch(getItemsByQuery(newQuery, 1));
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
    /**
     * 문제 상황: 배경색깔을 전체적으로 일괄적으로 주기위해서 min-h-full속성을 쓸려다가 오류 발생.
     * HeaderContainer도 Sticky속성. sticky속성이 relative와 fixed를 번갈아 바뀌는데,
     * 아래로 스크롤했을때, HeaderContainer도 fixed로 바뀌어서 html흐름에 영향을 주지않음.
     * 하지만 AllItemsContainer가 아래와 같이 min-h-screen이라서 header가 fixec로 바뀌자마자 전체 높이를 다 차지하고,
     * TableHeader와 ItemsTable의 sticky가 순간적으로 기준점이 AllItemsContainer로 바뀐다.
     * => bdolytics를 분석해보니, 내가 배경색깔을 주기 위해 사용한 거의 최상단 부모(header컨테이너, All컨테이너)한테만 주는듯하다.
     * => 그래서 배경색깔이 문제일때는 최상단에 min-h-full과 함계 색깔을 주자.
     * => 더 나아가, 클론코딩을 할떄는 부모부터 차례대로 따라하자.
     * => flex만을 고집할 필요는 없고, 중간중간 grid를 쓰는 모습을 볼수 있었음.
     */
    <div className="w-1080 mx-auto">
      {/* 테이블 헤더 시작, sticky속성 */}
      <TableHeader
        tableName={"전체 아이템"}
        itemSearchValue={itemSearchValue}
        onTableHeaderSearch={handleTableHeaderSearch}
      />
      <div className="flex flex-row items-start">
        <SidebarContainer onCategoryClick={handleCategoryClick} />
        <div className="bg-white flex flex-grow justify-center items-center flex-col rounded-lg">
          {loading ? (
            <div className="flex justify-center items-center w-full h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* 데이터 부분 sticky속성 */}
              <ItemsTable items={items} />
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
  );
}
