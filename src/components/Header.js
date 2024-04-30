import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import logo from "../images/logo.png";
import product from "../images/product.png";
import campfire from "../images/campfire.png";
import recommend from "../images/recommend.png";
import user from "../images/user.png";

export const MainHeader = () => {
  // const { username } = useSelector((state) => state.auth);

  return (
    <div>
      <nav className="w-full text-white mx-0 bg-headerBlack h-10">
        <div className="container flex justify-start items-center">
          <MainLink to="/" className="bg-mainBlue">
            <Img src={logo} alt="logo" />
            <Span>BDO_STOCK</Span>
          </MainLink>
          <MainLink to="/">
            <Img src={product} alt="product" />
            <Span>전체 아이템</Span>
          </MainLink>
          <MainLink to="/">
            <Img src={campfire} alt="campfire" />
            <Span>거래량 TOP</Span>
          </MainLink>
          <MainLink to="/">
            <Img src={recommend} alt="good" />
            <Span>추천 아이템</Span>
          </MainLink>
        </div>
      </nav>
    </div>
  );
};

export function SubHeader({ sublinks }) {
  return (
    <div>
      <nav className="flex text-white w-1080 mx-auto h-12 justify-between">
        {/* ul와 div클래스를 양 끝에 두고 싶은데 방법이 있을까? => justify-between*/}
        {/* gap을 두어 li끼리 사이를 띄울수 있음. */}
        <ul className="flex gap-6 justify-start items-center text-ligntBlue">
          {sublinks.map((sublink, index) => (
            <SubLink key={index} to={sublink.path}>
              <Span>{sublink.name}</Span>
            </SubLink>
          ))}
        </ul>
        <div className="flex items-center">
          <Img src={user} alt="user" />
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
    <div className="flex items-center min-h-10 bg-yellow-400">
      {/* width를 주지않으면 mx-auto가 먹히지 않음. */}
      <div className="w-1080 mx-auto">
        <Span className="">{notification}</Span>
      </div>
      {/* TODO: op.gg에서 x표시를 relative, absolute로 해줬음 한번 해보면 좋을듯 */}
    </div>
  );
}

const MainLink = tw.div(Link)`flex items-center px-2 h-10`;
const Img = tw.img`w-6 h-6 mr-1`;
const Span = tw.span`text-sm`;
// TODO: 마우스 커서를 올렸을때, 아래쪽 boarder, name색깔 변화함.
const SubLink = tw.li`flex items-center h-12 text-lightBlue font-medium border-b-3 border-transparent hover:border-white hover:text-white`;

// <ul className="flex space-x-4">
//   {username !== null ? (
//     <li>
//       <Link
//         className="text-white hover:text-blue-200 px-3 py-2 rounded-lg mb-2 sm:mb-0"
//         to="/logout"
//       >
//         로그아웃
//       </Link>
//       <span className="text-white px-3 py-2 rounded-lg mb-2 sm:mb-0">
//         환영합니다, {username}!
//       </span>
//     </li>
//   ) : (
//     <li>
//       <Link
//         className="text-white hover:text-blue-200 px-3 py-2 rounded-lg mb-2 sm:mb-0"
//         to="/login"
//       >
//         로그인
//       </Link>
//     </li>
//   )}
//   <li>
//     <a href="#" className="hover:text-blue-200">
//       장바구니 아이콘
//     </a>
//   </li>
//   <li>
//     <a href="#" className="hover:text-blue-200">
//       메뉴2
//     </a>
//   </li>
// </ul>;
