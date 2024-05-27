import React, { useState } from "react";

// TODO: 1. 이름을 일부만 입력해도 그 단어가 포함된 아이템들 리턴
// TODO: 2. 자동완성기능  처럼 한글자씩 입력해도 그 이름을 가진 아이템들 리턴.
export default function TableHeader({ tableName, itemSearchValue = "", onTableHeaderSearch }) {
  const [itemName, setItemName] = useState(itemSearchValue ? itemSearchValue : "");

  const handleInputChange = (event) => {
    setItemName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onTableHeaderSearch(itemName);
    }
  };

  return (
    <div
      className="w-full bg-gray-200 bg-base-400"
      style={{ position: "sticky", top: 128, padding: "8px 0 0 0" }}
    >
      <div className="w-full flex flex-row bg-gray-400 p-2 rounded-lg ">
        <h1 className="mr-auto whitespace-nowrap text-3xl font-bold div">{tableName}</h1>
        <div className="relative flex items-center justify-center rounded-lg pr-2 bg-base-200 borde opacity-90 hover:opacity-100 h-[40px] py-0.5 pl-2 bg-white">
          <input
            autoComplete="off"
            className="border-none bg-transparent px-2 font-medium outline-none placeholder:text-opacity-70  placeholder-gray-400 text-base"
            placeholder="아이템 이름"
            value={itemName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <svg
            className="w-6 h-6 text-gray-600 cursor-pointer"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => onTableHeaderSearch(itemName)}
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
