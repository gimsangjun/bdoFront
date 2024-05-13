import React, { useState, useEffect } from "react";
import ItemAPI from "../utils/itemAPI";
import TableHeader from "../components/item/TableHeader";
import TablePagination from "../components/item/TablePagination";
import ItemsData from "../components/item/ItemsData";
import SidebarContainer from "./SidebarContainer";
import { useSelector } from "react-redux";

export default function AllItemsContainer() {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainCategory, setMainCategory] = useState(0);
  const [subCategory, setsubCategory] = useState(0);
  const [itemFavorites, setItemFavorites] = useState([]); // TODO: 궁금한점 useState로 관리한것들은 새로고침하거나 페이지를 이동하면 사라지나?
  const { username } = useSelector((state) => state.auth);

  // ItemData 받아오는 부분.
  //TODO: 나중에 redux로 바꿔야할듯 복잡해짐
  useEffect(() => {
    const fetchItems = async () => {
      // TODO: Item을 강화할수 얘의 경우, 그냥 가장 마지막 단계만 보이도록 일단 설정함.
      // TODO: 데이터 불러오는중 로딩화면을 만들어야할듯.

      const response = await ItemAPI.getItemsByCategory(mainCategory, subCategory, currentPage); // params: mainCategory, subCategory, currentPage
      const allPrices = response.data.items.map((item) => {
        // TODO: price데이터가 없는경우 백엔드 서버에서 bdo관련 API와 관련해서
        // 가격정보 업데이트하고있는데, 시간초과떠서 그냥 price가 없는 상태로 넘어오는듯
        // price가 없는경우 그냥 빈값으로 들어가게 해야할듯., 시간초과 관련부분도 더 공부하고 정리해야할듯.
        const prices = item.price;
        return prices && prices.length > 0 ? prices[prices.length - 1] : item;
      });
      setItems(allPrices);
      setTotalCount(response.data.totalCount);
    };

    fetchItems();
  }, [currentPage, mainCategory, subCategory]);

  const handleCategoryClick = (_mainCategory, _subCategory) => {
    setMainCategory(_mainCategory);
    setsubCategory(_subCategory);
    setCurrentPage(1);
  };

  // 로그인한 유저가 있는 경우 userFavorite를 업데이트, 맨처음 한번만 호출됨.
  useEffect(() => {
    const fetchFavoritesItems = async () => {
      const { favorites } = await ItemAPI.getItemFavorite();
      setItemFavorites(favorites);
    };

    if (username) fetchFavoritesItems();
  }, [username]);

  const handleFavoriteClick = async (item) => {
    let isFavorite = false;
    if (itemFavorites) {
      // 이미 즐겨찾기한 얘는 삭제, 안한 얘는 즐겨찾기 추가
      isFavorite = itemFavorites.some(
        (favorite) => favorite.id === item.id && favorite.sid === item.sid
      );
    }

    try {
      if (isFavorite) {
        const { favorites } = await ItemAPI.removeItemFavorite(item);
        setItemFavorites(favorites);
      } else {
        const { favorites } = await ItemAPI.addItemFavorite(item);
        setItemFavorites(favorites);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-full bg-gray-200">
      {/* TODO: Bdolytics 보고 반응형웹 해보기. */}
      <div className="w-1210 mx-auto flex flex-col">
        {/* 테이블 헤더 시작 */}
        <TableHeader />
        <div className="flex">
          <SidebarContainer onCategoryClick={handleCategoryClick} />
          <div className="bg-white flex justify-center items-center flex-col rounded-lg">
            {/* 데이터 부분 */}
            <ItemsData
              items={items}
              onFavoriteClick={handleFavoriteClick}
              itemFavorites={itemFavorites}
            />
            {/* 페이지네이션 추가 */}
            <TablePagination
              currentPage={currentPage}
              totalCount={totalCount}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
