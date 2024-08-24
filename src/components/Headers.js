import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import logo from "../images/logo.png";
import product from "../images/product.png";
import campfire from "../images/campfire.png";
import recommend from "../images/recommend.png";
import userImg from "../images/user.png";
import home from "../images/home.png";
import anvil from "../images/anvil.png";
import { FaDiscord } from "react-icons/fa";

export const MainHeader = ({ onLogout }) => {
  const API_DOMAIN = process.env.REACT_APP_API_URL;
  const { user } = useSelector((state) => state.auth);

  // 버튼 클릭 핸들러
  const handleButtonClick = (event) => {
    if (user) {
      event.preventDefault(); // 링크 기능 방지
      onLogout(); // 로그아웃 함수 실행
    } else {
      // 디스코드 로그인
      window.location.href = `${API_DOMAIN}/auth/discord`;
    }
  };

  return (
    <div className="text-white mx-0 bg-headerBlack h-10">
      {/*윈도우가 줄어들었을때, 겹치는 문제가 생겼는데 
      min-w-max 속성을 추가 해줌으로서 해결
      min-w-max 속성 : 해당 요소의 최소 너비를 자식 요소들의 최대 너비로 설정하여 크기가 변하지 않도록 */}
      <div className="flex items-center justify-between min-w-max">
        {/* 양끝 정렬 : 이런식으로 그룹화 지어서 nav태그는 맨 왼쪽으로 붙이고, 로그인 버튼은 맨 오른쪽으로 붙임. */}
        <nav className="flex text-white justify-start">
          <MainLink to="/" className="bg-mainBlue">
            <Img src={logo} alt="logo" />
            <span className="font-bold text-lg">BDO.GG</span>
          </MainLink>
          <MainLink to="/" className="bg-mainBlue">
            <Img src={home} alt="home" />
            <Span>거래소</Span>
          </MainLink>
          <MainLink to="/reinforcement-caculator">
            <Img src={anvil} alt="anvil" />
            <Span>강화 기댓값 계산기</Span>
          </MainLink>
          <MainLink to="/processiong-trade">
            <Img src={recommend} alt="processiong trade" />
            <Span>가공 무역 계산기</Span>
          </MainLink>
          <MainLink to="/">
            <Img src={product} alt="product" />
            <Span>게시판</Span>
          </MainLink>
          <MainLink to="/">
            <Img src={campfire} alt="campfire" />
            <Span>공지사항</Span>
          </MainLink>
        </nav>
        <div className="flex shrink-0 items-center min-w-max">
          <div
            onClick={handleButtonClick}
            className="flex items-center justify-center space-x-2 cursor-pointer mr-2"
          >
            {!user && (
              <>
                <FaDiscord className="h-7 w-7" />
                <span className="text-xs">로그인</span>
              </>
            )}
            {user && (
              <>
                {user.username}
                <button className="bg-mainBlue text-white py-1 px-4 rounded text-xs ml-2">
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function SubHeader({ currentPath }) {
  // const { user } = useSelector((state) => state.auth);

  const sublinks = [
    { path: "/", name: "홈" },
    { path: "/items", name: "전체 아이템" },
    { path: "/favorite", name: "나의 관심 아이템" },
    { path: "/price-alert", name: "가격 알림 보기" },
  ];

  return (
    <div className="bg-mainBlue">
      <nav className="flex text-white w-1080 mx-auto h-12 justify-between">
        {/* ul와 div클래스를 양 끝에 두고 싶은데 방법이 있을까? => justify-between*/}
        {/* gap을 두어 li끼리 사이를 띄울수 있음. */}
        <ul className="flex gap-6 justify-start items-center text-ligntBlue">
          {sublinks.map((sublink, index) => (
            <SubLink
              key={index}
              to={sublink.path}
              currentPath={currentPath === sublink.path}
            >
              <Link to={sublink.path}>{sublink.name}</Link>
            </SubLink>
          ))}
        </ul>
        {/* lg: 1024px이상일때만 mr-0 스타일이 적용됨. */}
        <div className="flex items-center mr-2 lg:mr-0">
          <Img src={userImg} alt="user" />
          <Span>마이 페이지</Span>
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
