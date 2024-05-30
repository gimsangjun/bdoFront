import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavoriteItem, addFavoriteItem } from "../../modules/itemFav";

const FavoriteButton = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const { favItems } = useSelector((state) => state.itemFav);
  const isFavorite = checkIsFavorite(favItems, item);

  const dispatch = useDispatch();

  const handleFavoriteClick = async () => {
    if (!user) {
      alert("로그인을 하지 않았습니다.");
      return;
    }
    if (isFavorite) {
      console.log("remove!");
      dispatch(removeFavoriteItem(item));
    } else {
      if (favItems.length >= 30) {
        alert("30개까지만 즐겨찾기 가능합니다.");
        return;
      }
      dispatch(addFavoriteItem(item));
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={handleFavoriteClick}>
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18l-1-1.084C4.075 12.72 1 10.17 1 6.5 1 3.463 3.25 1 6.5 1 8.407 1 10 2.54 10 2.54S11.593 1 13.5 1C16.75 1 19 3.463 19 6.5c0 3.67-3.075 6.22-8 10.416L10 18z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18l-1-1.084C4.075 12.72 1 10.17 1 6.5 1 3.463 3.25 1 6.5 1 8.407 1 10 2.54 10 2.54S11.593 1 13.5 1C16.75 1 19 3.463 19 6.5c0 3.67-3.075 6.22-8 10.416L10 18z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

function checkIsFavorite(favItems, item) {
  if (!favItems) return false;
  return favItems.some((fav) => fav.id === item.id && fav.sid === item.sid);
}

export default FavoriteButton;
