import React, { useState, useEffect } from "react";
import TableHeader from "../components/item/TableHeader";
import TablePagination from "../components/item/TablePagination";
import ItemsData from "../components/item/ItemsData";
import SidebarContainer from "./SidebarContainer";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setCategory } from "../modules/item";

export default function AllItemsContainer() {
  const { items, totalCount, loading, mainCategory, subCategory } = useSelector(
    (state) => state.item
  ); // TODO, redux, state를 새로고침해도 유지 시키는 방법
  const [currentPage, setCurrentPage] = useState(1);
  const [itemFavorites, setItemFavorites] = useState([]); // TODO: 궁금한점 useState로 관리한것들은 새로고침하거나 페이지를 이동하면 사라지나?
  const [isFav, setIsFav] = useState(0);
  const { username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // 맨처음 아이템 로딩.
  useEffect(() => {
    dispatch(getItems(mainCategory, subCategory, currentPage));
  }, [dispatch, currentPage, mainCategory, subCategory]);

  const handleCategoryClick = (mainCategory, subCategory) => {
    dispatch(setCategory(mainCategory, subCategory));
  };

  // // 로그인한 유저가 있는 경우 userFavorite를 업데이트, 맨처음 한번만 호출됨.
  useEffect(() => {
    // const fetchFavoritesItems = async () => {
    //   const { favorites } = await ItemAPI.getItemFavorite();
    //   setItemFavorites(favorites);
    // };
    // if (username) fetchFavoritesItems();
  }, [username]);

  const handleAddFavoriteClick = async (item) => {
    // let isFavorite = false;
    // if (itemFavorites) {
    //   // 이미 즐겨찾기한 얘는 삭제, 안한 얘는 즐겨찾기 추가
    //   isFavorite = itemFavorites.some(
    //     (favorite) => favorite.id === item.id && favorite.sid === item.sid
    //   );
    // }
    // try {
    //   if (isFavorite) {
    //     const { favorites } = await ItemAPI.removeItemFavorite(item);
    //     setItemFavorites(favorites);
    //   } else {
    //     const { favorites } = await ItemAPI.addItemFavorite(item);
    //     setItemFavorites(favorites);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const handleFavClick = async () => {
    // setIsFav((isFav + 1) % 2);
  };

  return (
    <div className="w-full h-full bg-gray-200">
      {/* TODO: Bdolytics 보고 반응형웹 해보기. */}
      <div className="w-1210 mx-auto flex flex-col">
        {/* 테이블 헤더 시작 */}
        <TableHeader />
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
                  onFavoriteAddClick={handleAddFavoriteClick}
                  itemFavorites={itemFavorites}
                  onFavlick={handleFavClick}
                  isFav={isFav}
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
