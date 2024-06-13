import React, { useEffect, useState } from "react";
import Select from "react-select";
import ItemImg from "../item/ItemImg"; // 경로는 실제 ItemImg 파일 경로로 바꿔주세요
import ItemAPI from "../../utils/itemAPI";

export default function SelectItem({ items, handleItemId }) {
  const [selectListItem, setSelectListItem] = useState([]);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [isFoncus, setIsFocus] = useState(false); // 메뉴 열림 상태

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const IdsAndSids = [
          { id: 12094, sid: 0 }, // 데보레카 반지
          { id: 11653, sid: 0 }, // 데보레카 목걸이
          { id: 11882, sid: 0 }, // 데보레카 귀걸이
          { id: 12276, sid: 0 }, // 데보레카 허리띠
          { id: 719897, sid: 0 }, // 라브레스카의 투구
          { id: 719898, sid: 0 }, // 죽은신의 갑옷
          { id: 719899, sid: 0 }, // 단의 장갑
          { id: 719955, sid: 0 }, // 단의 장갑
          { id: 719900, sid: 0 }, // 아토르의 신발
          { id: 719956, sid: 0 }, // 아토르의 신발
        ];
        const data = await ItemAPI.getItemsByIdandSid(IdsAndSids);
        setSelectListItem(data);
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.log("SelectItem fetch Error", error);
        setLoading(false); // 에러 발생 시에도 로딩 완료
      }
    };

    fetchItem();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedItem(selectedOption.item);
    handleItemId(selectedOption.item.id);
    setIsFocus(false); // 선택 후 메뉴 닫기
  };

  // 로딩 중이거나 데이터가 없을 때를 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectListItem.length) {
    return <div>No items available</div>;
  }

  const options = selectListItem
    // .filter((item) => item.id !== selectedItem.id) // Filter out the selected item
    .map((item) => ({
      value: item.id,
      label: item.name,
      item: item,
    }));

  return (
    <div className="flex items-center mb-4 ">
      <ItemImg item={selectedItem} />
      {isFoncus ? (
        <Select
          className="w-[653px] ml-2 text-lg font-semibold hello"
          onChange={handleChange}
          options={options}
          value={options.find((option) => option.value === selectedItem.id)}
          // defaultInputValue={selectedItem.name} //이상해짐.
          onBlur={() => setIsFocus(false)} // 포커스 해제 시 상태 변경
          autoFocus
          formatOptionLabel={({ label, item }) => (
            <div className="flex items-center">
              <ItemImg item={item} className="w-6 h-6 mr-2 rounded-md" />
              <span className={selectedItem.id === item.id ? "opacity-40" : ""}>
                {label}
              </span>
            </div>
          )}
          filterOption={(option, inputValue) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
          }
          menuIsOpen={true} // 메뉴 항상 열림
          // 스크롤을 따라가지않고, document.body에 고정되어버림.
          // menuPortalTarget={document.body}
          // styles={{
          //   menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          // }}
        />
      ) : (
        <span
          className="w-[653px] ml-2 text-lg font-semibold cursor-pointer border border-gray-300 p-2 rounded"
          onClick={() => setIsFocus(true)}
        >
          {selectedItem.name}
        </span>
      )}
    </div>
  );
}
