import React from "react";
import tw from "twin.macro";

export default function ItemsData({ items }) {
  return (
    // TODO 자식을 벗어나는 부분에 대해서는 배경색깔이 바뀌지않음.(아래로 스크롤 하면 보임.)
    <div className="w-full h-full bg-gray-200 mx-auto flex justify-center items-center flex-col my-5">
      {/* 데이터 부분 시작. , w-full 이유 : width맞춰줄려고. */}
      <div className="w-full overflow-x-auto rounded-lg">
        {/* TODO : min-w-full의 의미 */}
        <table className="min-w-full">
          <thead className="bg-gray-200 ">
            <tr>
              <DataTh scope="col">이름</DataTh>
              <DataTh scope="col">현재 거래소 가격</DataTh>
              <DataTh scope="col">현재 매물</DataTh>
              <DataTh scope="col">일일 거래량</DataTh>
              <DataTh scope="col">즐겨 찾기</DataTh>
              <DataTh scope="col">가격 알림</DataTh>
              <DataTh scope="col">가격 업데이트 시간</DataTh>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {/* items를 매핑하여 각 행을 생성 */}
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 border-b-2 border-gray-100">
                <DataTd>{item.name}</DataTd>
                <DataTd>아직없음</DataTd>
                <DataTd>아직없음</DataTd>
                <DataTd>아직없음</DataTd>
                <DataTd>아직없음</DataTd>
                <DataTd>아직없음</DataTd>
                <DataTd>아직없음</DataTd>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const DataTh = tw.th`px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-100 uppercase tracking-wider`;
const DataTd = tw.td`px-6 py-4 whitespace-nowrap`;
