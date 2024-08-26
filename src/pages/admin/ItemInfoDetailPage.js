import { useSearchParams } from "react-router-dom";
import HeaderContainer from "../../containers/HeaderContainer";
import ItemInfoDetailContainer from "../../containers/admin/item-info/ItemInfoDetailContainer";

// 관리자 - 아이템 정보 수정
export default function ItemInfoDetailPage() {
  const [searchParams] = useSearchParams();

  // 쿼리 파라미터에서 id와 sid 값을 가져옴
  const id = searchParams.get("id");
  const sid = searchParams.get("sid");
  return (
    <div className="flex min-w-[1080px] min-h-screen flex-col bg-gray-200">
      <HeaderContainer />
      <ItemInfoDetailContainer id={id} sid={sid} />
    </div>
  );
}
