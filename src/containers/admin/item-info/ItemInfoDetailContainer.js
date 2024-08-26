import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 사용하여 라우팅
import ItemInfoUpdateAPI from "../../../utils/itemInfoUpdateAPI";
import ItemImg from "../../../components/item/ItemImg";

export default function ItemInfoDetailContainer({ id, sid }) {
  const [item, setItem] = useState(null); // 아이템 정보를 저장하는 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [formData, setFormData] = useState({}); // 수정 가능한 필드를 위한 상태
  const [newField, setNewField] = useState({ key: "", value: "" }); // 새 필드 추가를 위한 상태

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

  // 아이템 정보 표시 및 수정 폼
  return (
    <div className="m-6 p-6 bg-white shadow-lg rounded-lg max-w-[1080px] mx-auto">
      {item ? (
        <div>
          {/* h2와 ItemImg를 Flexbox로 감싸서 일렬로 정렬 */}
          <div className="flex items-center mb-4 bg-gray-400 p-2 rounded-lg">
            <h2 className="text-2xl font-semibold mr-4">아이템 정보 수정</h2>
            <ItemImg item={item} className="w-9 h-9 bg-white rounded-md" />
          </div>
          {/* grid를 사용하여 입력 필드를 여러 열로 정렬 */}
          {/* 각각의 그리드 요소들이 잘 구별 되도록 border를 넣어서 꾸며줌 */}
          <div className="grid grid-cols-4 gap-4">
            {Object.keys(formData).map(
              (key) =>
                key !== "_id" &&
                key !== "__v" && ( // _id 및 __v 필드를 숨김
                  <div
                    key={key}
                    className="col-span-1 relative p-4 border rounded"
                  >
                    <label className="block font-semibold mb-1">{key}</label>
                    {typeof formData[key] === "string" ||
                    typeof formData[key] === "number" ? (
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <textarea
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    )}
                    <button
                      onClick={() => handleDeleteField(key)}
                      className="absolute top-0 right-0 mt-1 mr-1 p-1 bg-red-500 text-white rounded"
                    >
                      삭제
                    </button>
                  </div>
                ),
            )}
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
                className="p-2 border rounded w-1/4"
              />
              <input
                type="text"
                name="value"
                value={newField.value}
                onChange={handleNewFieldChange}
                placeholder="값"
                className="p-2 border rounded w-3/4"
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
