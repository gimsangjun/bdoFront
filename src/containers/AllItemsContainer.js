import React, { useEffect } from "react";
import TableHeader from "../components/item/TableHeader";
import TablePagination from "../components/item/TablePagination";
import ItemsData from "../components/item/ItemsData";
import SidebarContainer from "./SidebarContainer";
import { useDispatch, useSelector } from "react-redux";
import { getItemsByQuery, updateItems } from "../modules/item";
import { fetchFavoriteItems, addFavoriteItem, removeFavoriteItem } from "../modules/itemFav";
import { useLocation } from "react-router-dom";

export default function AllItemsContainer() {
  // TODO, redux, state를 새로고침해도 유지 시키는 방법, 로컬 스토리지 인가 브라우저에 저장?
  const { loading, items, query, pages, currentPage, totalCount } = useSelector(
    (state) => state.item
  );
  const { favItems } = useSelector((state) => state.itemFav);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemSearchValue = queryParams.get("item_search_value");

  const dispatch = useDispatch();

  useEffect(() => {
    // itemSearchValue가 있을 수 있는 경우
    // 1. 메인 페이지에서 검색해서 넘어왔을 경우.
    // 2. 전체 아이템페이지에서 TableHeader에서 검색했을 경우.
    // TODO: 아이템을 검색할경우 pagination을 어떻게 구현해야할지 생각해봐야할듯. 많이 복잡해짐.
    // => 현재 백엔드 코드를 살펴 본 결과 검색하는 거는 데이터가 많이 없으니까. 그냥 다 한번에 다 보냄.
    // => 이부분에 대해서 어려웠던점 notion + github에 추가하면 좋을듯.
    // => 프론트측에 맨처음에 모든 데이터 받아오기? 아니면 백엔드 측에 page 기능 전부 달아야됨.
    // => 정답은 프론트측에서 동적 쿼리 보내기

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
      ...query,
      mainCategory,
      subCategory,
    };
    dispatch(getItemsByQuery(newQuery, 1));
  };

  // 로그인한 유저가 있는 경우 userFavorite를 업데이트, 맨처음 한번만 호출됨.
  useEffect(() => {
    if (!user) return;
    dispatch(fetchFavoriteItems());
  }, [user, dispatch]);

  // 즐겨찾기 추가 및 삭제
  const handleFavoriteClick = async (item, isFavorite) => {
    if (!user) {
      alert("로그인을 하지 않았습니다.");
      return;
    }
    if (isFavorite) {
      dispatch(removeFavoriteItem(item));
    } else {
      if (favItems.length >= 30) alert("30개까지만 즐겨찾기 가능합니다.");
      dispatch(addFavoriteItem(item));
    }
  };

  const handleItemUpdate = async (name) => {
    dispatch(updateItems(name, items));
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
              // Display a spinner or loading message while loading is true
              <div className="flex justify-center items-center w-full h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            ) : (
              // Regular content display when not loading
              <>
                {/* 데이터 부분 */}
                <ItemsData
                  items={items}
                  onFavoriteClick={handleFavoriteClick}
                  favItems={favItems}
                  onItemUpdate={handleItemUpdate}
                />
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
