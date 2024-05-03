import React from "react";
import tw from "twin.macro";

export default function Category({
  onCategoryChange,
  selectedCategory,
  onFavoriteChange,
  isFavoriteChecked,
}) {
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    onCategoryChange(selectedCategory);
  };

  const handleFavoriteChange = (event) => {
    onFavoriteChange();
  };

  // 선택된 항목인지 확인하는 함수
  const isSelected = (value) => {
    return selectedCategory === value || (value === "favorite" && isFavoriteChecked);
  };

  // 선택된 항목인 경우 추가 스타일을 적용하는 함수
  const getAdditionalClasses = (value) => {
    return isSelected(value) ? "bg-blue-500 text-white font-bold" : "bg-gray-200 text-black";
  };

  // 카테고리 항목 배열
  const categories = [
    { value: "all", label: "All" },
    { value: "cooking", label: "요리" },
    { value: "alchemy", label: "연금" },
    { value: "processing", label: "가공" },
    { value: "weapon", label: "무기" },
    { value: "armor", label: "방어구" },
    { value: "accessory", label: "악세사리" },
  ];

  return (
    <div className="w-full bg-white my-4 rounded-lg">
      <table className="w-full">
        {/* colgroup활용하여 컬럼간 간격 조절 */}
        <colgroup>
          <col width="118" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr className="border-b-1 border-gray-200">
            <th scope="row">카테고리</th>
            {/* colgroup을 활용해서 두번째 col에 *을 줬는데, 자기자신의 크기만큼만 차지하고있음 => 부모인 table을 width를 정확히 지정해줘야함. */}
            <td>
              <div>
                {categories.map((category) => (
                  <Label key={category.value}>
                    {/* input 라디오 버튼은 엄청작은데 span태그를 클릭해도 라디오 버튼이 눌리는 이유 => 라디오 버튼이 엄청 작더라도, 라벨(Label) 요소에 연결되어 있기 때문에 라벨을 클릭하면 실제로는 연결된 라디오 버튼이 클릭되는 것 */}
                    <InputRadio
                      type="radio"
                      name="category"
                      value={category.value}
                      onChange={handleCategoryChange}
                      checked={isSelected(category.value)}
                    />
                    <Text className={getAdditionalClasses(category.value)}>{category.label}</Text>
                  </Label>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">즐겨찾기</th>
            <td>
              <Label>
                <InputRadio
                  type="radio"
                  name="favorite"
                  value="favorite"
                  onChange={handleFavoriteChange}
                  checked={isSelected("favorite")}
                />
                <Text className={getAdditionalClasses("favorite")}>즐겨찾기</Text>
              </Label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const Label = tw.label`relative inline-block m-1`;
const InputRadio = tw.input`absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer appearance-none border-none align-middle`;
const Text = tw.span`inline-flex items-center justify-center h-7 px-3 rounded-14`;
