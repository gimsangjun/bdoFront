import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 사용하여 라우팅
import ItemInfoUpdateAPI from "../../../utils/itemInfoUpdateAPI"; // API 호출을 위한 유틸리티

export default function ItemCreateContainer() {
  // 기본 필드인 name, id, sid를 초기화
  const [formData, setFormData] = useState({ name: "", id: "", sid: "" }); // 새 아이템의 데이터를 저장할 상태
  const [newField, setNewField] = useState({ key: "", value: "" }); // 새 필드 추가를 위한 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // 새 필드 입력 핸들러
  const handleNewFieldChange = (e) => {
    const { name, value } = e.target;
    setNewField((prevNewField) => ({
      ...prevNewField,
      [name]: value,
    }));
  };

  // 새 필드 추가 핸들러
  const handleAddField = () => {
    if (newField.key && newField.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [newField.key]: newField.value,
      }));
      setNewField({ key: "", value: "" }); // 필드 추가 후 초기화
    } else {
      alert("키와 값을 입력해 주세요.");
    }
  };

  // 필드 삭제 핸들러
  const handleDeleteField = (key) => {
    // 기본 필드는 삭제할 수 없도록 제한
    if (key === "name" || key === "id" || key === "sid") {
      alert("기본 필드는 삭제할 수 없습니다.");
      return;
    }
    const updatedFormData = { ...formData };
    delete updatedFormData[key];
    setFormData(updatedFormData);
  };

  // 아이템 생성 함수
  const handleCreate = async () => {
    // 기본 필드가 모두 입력되었는지 확인
    if (!formData.name || !formData.id || !formData.sid) {
      alert("기본 필드(name, id, sid)는 필수입니다.");
      return;
    }

    try {
      const response = await ItemInfoUpdateAPI.createItem(formData);
      console.log(response);
      alert("새로운 아이템이 성공적으로 생성되었습니다.");
      // 아이템 생성 후 상세 페이지로 이동
      navigate(`/admin/item-info-detail?id=${formData.id}&sid=${formData.sid}`);
    } catch (error) {
      console.error("아이템을 생성하는 중 오류가 발생했습니다.", error);
      alert("아이템을 생성하는 중 오류가 발생했습니다.");
    }
  };

  // 목록 페이지로 돌아가는 함수
  const goBackToList = () => {
    navigate("/admin/item-info-list");
  };

  // 아이템 정보 표시 및 생성 폼
  return (
    <div className="m-6 p-6 bg-white shadow-lg rounded-lg max-w-[1080px] mx-auto">
      <div>
        {/* h2와 필드 추가 UI */}
        <div className="flex items-center mb-4 bg-gray-400 p-2 rounded-lg">
          <h2 className="text-2xl font-semibold mr-4">새 아이템 생성</h2>
        </div>
        {/* grid를 사용하여 입력 필드를 여러 열로 정렬 */}
        {/* 각각의 그리드 요소들이 잘 구별 되도록 border를 넣어서 꾸며줌 */}
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="col-span-1 relative p-4 border rounded">
              <label className="block font-semibold mb-1">{key}</label>
              {typeof formData[key] === "string" ||
              typeof formData[key] === "number" ? (
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required={key === "name" || key === "id" || key === "sid"}
                />
              ) : (
                <textarea
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              )}
              {/* 기본 필드는 삭제 버튼을 표시하지 않음 */}
              {key !== "name" && key !== "id" && key !== "sid" && (
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
        {/* 새 필드 추가 입력 및 버튼 */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">새 필드 추가</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="key"
              value={newField.key}
              onChange={handleNewFieldChange}
              placeholder="키"
              className="p-2 border rounded w-1/2"
            />
            <input
              type="text"
              name="value"
              value={newField.value}
              onChange={handleNewFieldChange}
              placeholder="값"
              className="p-2 border rounded w-1/2"
            />
            <button
              onClick={handleAddField}
              className="p-2 bg-green-500 text-white rounded text-nowrap"
            >
              추가
            </button>
          </div>
        </div>
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
