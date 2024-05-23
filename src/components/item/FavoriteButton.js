import React from "react";

const FavoriteButton = ({ item, onFavoriteClick, isFavorite }) => {
  return (
    <div className="flex justify-center items-center">
      <button onClick={() => onFavoriteClick(item)}>
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

export default FavoriteButton;
