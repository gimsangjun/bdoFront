import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 사용하여 라우팅
import ItemInfoUpdateAPI from "../../../utils/itemInfoUpdateAPI";
import ItemImg from "../../../components/item/ItemImg";
import SubIngredientManager from "./SubIngredientManager"; // Import SubIngredientManager
import FieldManager from "./FieldManager"; // Import FieldManager

export default function ItemInfoDetailContainer({ id, sid }) {
  const [item, setItem] = useState(null); // 아이템 정보를 저장하는 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [formData, setFormData] = useState({}); // 수정 가능한 필드를 위한 상태
  const [ingredients, setIngredients] = useState([]); // 하위 재료를 관리하는 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 아이템 정보를 가져오는 함수
  const fetchItem = async () => {
    try {
      setIsLoading(true); // 로딩 시작
      const response = await ItemInfoUpdateAPI.getItems({ id, sid });
      const data = response.items;
      if (data && data.length > 0) {
        setItem(data[0]);
        setFormData(data[0]); // 아이템 정보를 formData로 설정
        setIngredients(data[0].ingredients || []); // 하위 재료 설정
      }
      setIsLoading(false); // 로딩 종료
    } catch (error) {
      console.error("아이템 정보를 가져오는 중 오류가 발생했습니다.", error);
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 또는 id, sid 변경 시 아이템 정보를 가져옴
  useEffect(() => {
    if (id && sid) {
      fetchItem();
    }
  }, [id, sid]);

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

  // 아이템 정보 업데이트 함수
  const handleUpdate = async () => {
    try {
      const updatedData = {
        id: id,
        sid: sid,
        ...formData,
        ingredients, // 하위 재료 포함
      };
      const response = await ItemInfoUpdateAPI.updateItem(updatedData);
      alert("아이템 정보가 성공적으로 업데이트되었습니다.");
      setItem(response); // 업데이트된 아이템 정보로 상태 업데이트
    } catch (error) {
      console.error(
        "아이템 정보를 업데이트하는 중 오류가 발생했습니다.",
        error,
      );
      alert("아이템 정보를 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  // 목록 페이지로 돌아가는 함수
  const goBackToList = () => {
    navigate("/admin/item-info-list");
  };

  // 로딩 중일 때 로딩 메시지 표시
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="m-6 p-6 bg-white shadow-lg rounded-lg max-w-[1080px] mx-auto">
      {item ? (
        <div>
          {/* h2와 ItemImg를 Flexbox로 감싸서 일렬로 정렬 */}
          <div className="flex items-center mb-4 bg-gray-400 p-2 rounded-lg">
            <h2 className="text-2xl font-semibold mr-4">아이템 정보 수정</h2>
            <ItemImg item={item} className="w-9 h-9 bg-white rounded-md" />
          </div>
          {/* 필드 수정 섹션 */}
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(formData).map(
              (key) =>
                key !== "_id" &&
                key !== "__v" &&
                key !== "ingredients" && ( // _id 및 __v 필드를 숨김
                  <div
                    key={key}
                    className="col-span-1 relative p-4 border rounded"
                  >
                    <label className="block font-semibold mb-1">{key}</label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required={key === "name" || key === "id" || key === "sid"}
                    />
                    {/* 필수 필드가 아닌 경우에만 삭제 버튼 추가 */}
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
                ),
            )}
          </div>
          {/* 하위 재료 추가 */}
          <SubIngredientManager
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          {/* 새로운 필드 추가 */}
          <FieldManager formData={formData} setFormData={setFormData} />
          <button
            onClick={handleUpdate}
            className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
          >
            업데이트
          </button>
          <button
            onClick={goBackToList}
            className="mt-2 w-full p-2 bg-gray-500 text-white rounded"
          >
            목록으로 돌아가기
          </button>
        </div>
      ) : (
        <div>아이템 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
}
