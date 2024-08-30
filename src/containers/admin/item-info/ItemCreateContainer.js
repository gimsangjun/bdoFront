import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 사용하여 라우팅
import ItemInfoUpdateAPI from "../../../utils/itemInfoUpdateAPI";
import SubIngredientManager from "../../../components/admin/item-info/SubIngredientManager"; // 하위 재료 추가 컴포넌트 import
import FieldManager from "../../../components/admin/item-info/FieldManager"; // 새 필드 추가 컴포넌트 import

export default function ItemCreateContainer() {
  const [formData, setFormData] = useState({
    name: "",
    id: 0,
    sid: 0,
    mainCategory: 0,
    subCategory: 0,
    basePrice: 0,
  });
  const [ingredients, setIngredients] = useState([]); // 하위재료 데이터 저장

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // 필드 삭제 핸들러
  const handleDeleteField = (key) => {
    const updatedFormData = { ...formData };
    delete updatedFormData[key];
    setFormData(updatedFormData);
  };

  // 아이템 생성 함수
  const handleCreate = async () => {
    // 기본 필드가 모두 입력되었는지 확인
    if (!formData.name) {
      alert("name은 필수입니다.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      ingredients, // 재료 목록 추가
    };

    try {
      const response = await ItemInfoUpdateAPI.createItem(dataToSubmit);
      console.log(response);
      alert("새로운 아이템이 성공적으로 생성되었습니다.");
      // 아이템 생성 후 상세 페이지로 이동
      navigate(`/admin/item-info-detail?id=${formData.id}&sid=${formData.sid}`);
    } catch (error) {
      console.error("아이템을 생성하는 중 오류가 발생했습니다.", error);
      alert(
        "아이템을 생성하는 중 오류가 발생했습니다. ",
        error.response.data.message,
      );
    }
  };

  // 목록 페이지로 돌아가는 함수
  const goBackToList = () => {
    navigate("/admin/item-info-list");
  };

  return (
    <div className="m-6 p-6 bg-white shadow-lg rounded-lg max-w-[1080px] mx-auto">
      <div>
        <div className="flex items-center mb-4 bg-gray-400 p-2 rounded-lg">
          <h2 className="text-2xl font-semibold mr-4">새 아이템 생성</h2>
        </div>
        {/* grid를 사용하여 입력 필드를 여러 열로 정렬 */}
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="col-span-1 relative p-4 border rounded">
              <label className="block font-semibold mb-1">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required={key === "name" || key === "id" || key === "sid"}
              />
              {key !== "name" &&
                key !== "id" &&
                key !== "sid" &&
                key !== "mainCategory" &&
                key !== "subCategory" &&
                key !== "basePrice" && (
                  <button
                    onClick={() => handleDeleteField(key)}
                    className="absolute top-0 right-0 mt-1 mr-1 p-1 bg-red-500 text-white rounded"
                  >
                    삭제
                  </button>
                )}
            </div>
          ))}
        </div>
        {/* 하위 재료 추가 컴포넌트 */}
        <SubIngredientManager
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        {/* 새 필드 추가 컴포넌트 */}
        <FieldManager formData={formData} setFormData={setFormData} />
        <button
          onClick={handleCreate}
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
        >
          생성
        </button>
        <button
          onClick={goBackToList}
          className="mt-2 w-full p-2 bg-gray-500 text-white rounded"
        >
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}
