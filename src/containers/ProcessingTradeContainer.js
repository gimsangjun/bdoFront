import CraftingToolDetails from "../components/processing-trade/CraftingToolDetails";

// 가공 무역
export default function ProcessingTradeContainer() {
  // 현재 item DB의 내용
  //TODO: 여기에 하위재료와 details를 넣어야됨. DB조작하기 힘드니까 그냥 관리자 페이지 만들어서 하는게 나을듯?
  // {
  //   _id: ObjectId('664d464e4417f97dad97c4e8'),
  //   id: 4702,
  //   name: '측백나무 합판',
  //   mainCategory: 25,
  //   subCategory: 2,
  //   __v: 0,
  //   grade: 'common'
  // }

  // 임시 데이터
  // 만약 item정보가 없다면, 새로 만들어서 넣어야됨.
  const item = {
    id: 55757,
    name: "설원 목재 상자",
    details: [
      "설명 : 측백나무 합판, 설원 삼나무 합판을 5개씩 묶어서 포장한 무역 아이템이다.",
    ],
    materianls: [
      { id: 4702, name: "측백 나무 합판", quantity: 5 },
      { id: 4722, name: "설원 삼나무 합판", quantity: 5 },
    ],
  };

  return <CraftingToolDetails item={item} />;
}
