import React from "react";
import { MainHeader, NotificationHeader, SubHeader } from "../components/Header";
import { useLocation } from "react-router-dom";

export default function HeaderContainer() {
  // 현재 어느 url에 있는지에 따라서 SubHeader아래에 밑줄
  const location = useLocation();
  return (
    // header 고정: relative일 경우 스크롤 더 밑으로 내리면 보이지 않음.
    // 하지만 sticky top-0를 하면 정상적으로 동작함.
    // 생각해보니 relative을 줄경우, 부모가 애초에 아래로 스크롤할때 내려가면 화면상에 안보여서 이 헤더들도 안보이는듯
    <div className="sticky top-0">
      <MainHeader />
      <SubHeader currentPath={location.pathname} />
      <NotificationHeader />
    </div>
  );
}
