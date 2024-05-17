import React from "react";
import TableHeader from "../components/item/TableHeader";
import { useDispatch, useSelector } from "react-redux";
import FavItemsData from "../components/favItem/FavItemsData";
import { removeFavoriteItem } from "../modules/itemFav";

export default function FavItemsContainer() {
  const { favItems, loading } = useSelector((state) => state.itemFav);
  // const [currentPage, setCurrentPage] = useState(1); 나중에 기능구현, 지금은 즐겨찾기 추가 30개로 제한해두자.

  const dispatch = useDispatch();

  const handleFavoriteClick = async (item, isFavorite) => {
    dispatch(removeFavoriteItem(item));
  };

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="w-1210 mx-auto flex flex-col">
        <TableHeader tableName={"관심 아이템"} />
        <div className="bg-white flex flex-grow justify-center items-center flex-col rounded-lg">
          {loading ? (
            // Display a spinner or loading message while loading is true
            <div className="flex justify-center items-center w-full h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <FavItemsData favItems={favItems} onFavoriteClick={handleFavoriteClick} />
          )}
        </div>
      </div>
    </div>
  );
}
