import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import logo from "../images/logo.png";
import product from "../images/product.png";
import campfire from "../images/campfire.png";
import recommend from "../images/recommend.png";
import user from "../images/user.png";
import home from "../images/home.png";

// TODO: react-component 헤더부분에 넣어야할듯.
export const MainHeader = ({ onLogout }) => {
  const { username } = useSelector((state) => state.auth);

  return (
    // TODO: 문제점, 화면을 줄이고 오른쪽으로 스크롤을 하면 bg-headerBlack 색깔이 먹히지 않음.
    <div className="w-full text-white mx-0 bg-headerBlack h-10">
      <div className="flex items-center justify-between">
        {/* subHeader 처럼 li태그를 사용하지않고 단순히 flex만 사용, flex 자식 관련 속성은 MainLink 참고 */}
        {/* 이런식으로 그룹화 지어서 nav태그는 맨 왼쪽으로 붙이고, 로그인 버튼은 맨 오른쪽으로 붙임. */}
        <nav className="flex text-white justify-start">
          <MainLink to="/" className="bg-mainBlue">
            <Img src={logo} alt="logo" />
            <span className="font-bold text-lg">BDO.GG</span>
          </MainLink>
          <MainLink to="/" className="bg-mainBlue">
            <Img src={home} alt="home" />
            <Span>거래소</Span>
          </MainLink>
          <MainLink to="/">
            <Img src={product} alt="product" />
            <Span>게시판</Span>
          </MainLink>
          <MainLink to="/">
            <Img src={campfire} alt="campfire" />
            <Span>공지사항</Span>
          </MainLink>
          <MainLink to="/">
            <Img src={recommend} alt="good" />
            <Span>아무거나</Span>
          </MainLink>
        </nav>
        {/* 극단적으로 window가 줄어들었을 때, nav태그에 로그인 버튼이 침범. 안보이게 반응형으로 안보이게함. */}
        <div className="flex shrink-0 items-center">
          {/*TODO "username이 없으면 Link to "login",있으면 "/"으로 이동 */}
          <Link to={username ? "/" : "/login"}>
            <button
              onClick={onLogout}
              className="bg-mainBlue text-white py-1 px-4 mx-2 rounded text-xs hidden sm:inline-block"
            >
              {username ? "로그아웃" : "로그인"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export function SubHeader({ currentPath }) {
  const { username } = useSelector((state) => state.auth);

  const sublinks = [
    { path: "/", name: "홈" },
    { path: "/items", name: "전체 아이템" },
    { path: "/favorite", name: "나의 관심 아이템" },
    { path: "/top", name: "거래량 TOP" },
    { path: "/recommend", name: "추천 아이템" },
  ];

  return (
    <div className="bg-mainBlue">
      <nav className="flex text-white w-1080 mx-auto h-12 justify-between">
        {/* ul와 div클래스를 양 끝에 두고 싶은데 방법이 있을까? => justify-between*/}
        {/* gap을 두어 li끼리 사이를 띄울수 있음. */}
        <ul className="flex gap-6 justify-start items-center text-ligntBlue">
          {sublinks.map((sublink, index) => (
            <SubLink key={index} to={sublink.path} currentPath={currentPath === sublink.path}>
              <Link to={sublink.path}>{sublink.name}</Link>
            </SubLink>
          ))}
        </ul>
        <div className="flex items-center">
          <Img src={user} alt="user" />
          <Span>{username && username} 마이 페이지</Span>
        </div>
      </nav>
    </div>
  );
}

export function NotificationHeader({ notification }) {
  notification = notification
    ? notification
    : "당신의 취향을 만족시킬 게임들, Games.op.gg에서 만나보세요! 🎮 [클릭]";
  return (
    <div className="flex items-center h-10 bg-yellow-400">
      {/* width를 주지않으면 mx-auto가 먹히지 않음. */}
      <div className="w-1080 mx-auto">
        {/* whitespace-nowrap : 두줄로 표시되지않게 */}
        <Span className="whitespace-nowrap">{notification}</Span>
      </div>
      {/* TODO: op.gg에서 x표시를 relative, absolute로 해줬음 한번 해보면 좋을듯 */}
    </div>
  );
}

// grow-0 : 컨테이너 커져도 유지, shrink-0 : 컨테이너 작아져도 유지, flex-1 : 1 1 0(grow, shrink, basis)
const MainLink = tw.div(Link)`flex items-center px-2 h-10 grow-0 shrink-0`;
const Img = tw.img`w-6 h-6 mr-1`;
const Span = tw.span`text-sm`;

// blog글대로 해볼려고 했는데, 뭔가 복잡해서 그냥 공식문서 보고 그대로 따라함.
// 이런식으로 conditional styling이 가능.
const SubLink = styled.li(({ currentPath }) => [
  tw`flex items-center h-12 text-lightBlue font-medium border-b-3 border-transparent hover:border-white hover:text-white`,
  currentPath && tw`border-b-3 border-white text-white`,
]);
