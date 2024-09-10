import ItemImg from "../ItemImg";

// 하위 아이템 표시
export default function ComponentItem({ item }) {
  return (
    <div className="p-1 mt-2 pl-3 bg-white rounded-lg">
      <div className="flex items-center">
        {/* 하위 아이템 이미지 */}
        <ItemImg item={item} className="w-10 h-10 mr-4 border-2" />
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            {/* 아이템 이름 및 수량 */}
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">&nbsp;X {item.quantity}</p>
          </div>
          <p className="text-sm font-semibold text-blue-500 mt-1">
            가격: {item.price} 골드
          </p>
        </div>
      </div>

      {/* 하위 재료가 있을 경우 */}
      {item.components && item.components.length > 0 && (
        <div>
          {item.components.map((subItem, index) => (
            <ComponentItem key={index} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}
