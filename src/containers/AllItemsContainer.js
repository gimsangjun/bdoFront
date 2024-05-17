import React, { useState, useEffect } from "react";
import TableHeader from "../components/item/TableHeader";
import TablePagination from "../components/item/TablePagination";
import ItemsData from "../components/item/ItemsData";
import SidebarContainer from "./SidebarContainer";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setCategory } from "../modules/item";
import { fetchFavoriteItems, addFavoriteItem, removeFavoriteItem } from "../modules/itemFav";
export default function AllItemsContainer() {
  // TODO, redux, state를 새로고침해도 유지 시키는 방법
  const { items, totalCount, loading, mainCategory, subCategory } = useSelector(
    (state) => state.item
  );
  const { favItems } = useSelector((state) => state.itemFav);
  const { username } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  // 맨처음 아이템 로딩.
  useEffect(() => {
    dispatch(getItems(mainCategory, subCategory, currentPage));
  }, [dispatch, currentPage, mainCategory, subCategory]);

  const handleCategoryClick = (mainCategory, subCategory) => {
    dispatch(setCategory(mainCategory, subCategory));
  };

  // 로그인한 유저가 있는 경우 userFavorite를 업데이트, 맨처음 한번만 호출됨.
  useEffect(() => {
    if (!username) return;
    dispatch(fetchFavoriteItems());
  }, [username, dispatch]);

  // 즐겨찾기 추가 및 삭제
  const handleFavoriteClick = async (item, isFavorite) => {
    if (!username) return;
    if (isFavorite) {
      dispatch(removeFavoriteItem(item));
    } else {
      if (favItems.length >= 30) alert("30개까지만 즐겨찾기 가능합니다.");
      dispatch(addFavoriteItem(item));
    }
  };

  return (
    <div className="w-full h-full bg-gray-200">
      {/* TODO: Bdolytics 보고 반응형웹 해보기. */}
      <div className="w-1210 mx-auto flex flex-col">
        {/* 테이블 헤더 시작 */}
        <TableHeader tableName={"전체 아이템"} />
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
                />
                {/* 페이지네이션 추가 */}
                <TablePagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
