import React from "react";

export default function TableHeader() {
  return (
    <div
      className="w-full bg-gray-200 bg-base-400"
      // padding을 준 이유 : header와의 간격이 없어서 답답해보여서 margin을 주긴해야하는데, 그러면 itemData가 보여서 div태그를 하나 더 만들어 padding을 줌.
      style={{ position: "sticky", top: 128, padding: "8px 0 0 0" }}
    >
      <div className="w-full flex flex-row bg-gray-400 p-2 rounded-lg ">
        {/* mr-auto:  부모 요소 내에서 자식 요소를 우측으로 밀어내는 데 사용*/}
        <h1 className="mr-auto whitespace-nowrap text-3xl font-bold div">전체 아이템</h1>
        <div className="relative flex items-center justify-center rounded-lg pr-2 bg-base-200 borde opacity-90 hover:opacity-100 h-[40px] py-0.5 pl-2 bg-white">
          {/* TODO: 돋보기 추가 */}
          <input
            autoComplete="off"
            className="border-none bg-transparent px-2 font-medium outline-none placeholder:text-opacity-70  placeholder-gray-400 text-base"
            placeholder="아이템 이름"
          />
        </div>
      </div>
    </div>
  );
}
