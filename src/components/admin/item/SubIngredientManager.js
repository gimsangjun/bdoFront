import React, { useState } from "react";
import ItemAPI from "../../../utils/itemAPI";

export default function SubcomponentManager({ components, setComponents }) {
  // 원래 DB에는 name은 없는데, 알아서 짤림.
  const [newComponent, setNewComponent] = useState({
    name: "",
    quantity: 1,
    id: "", // ID 상태를 추가
  });
  const [idStatus, setIdStatus] = useState(""); // ID 유무 상태

  // 하위 재료 이름으로 ID를 가져오는 함수
  const fetchComponentId = async (componentName) => {
    try {
      const result = await ItemAPI.getItemsByQuery({ name: componentName });
      if (result.items.length > 0) {
        setIdStatus(
          "아이템 이름 : " +
            result.items[0].name +
            " id: " +
            result.items[0].id,
        );
        return result.items[0].id;
      } else {
        setIdStatus("해당 이름의 아이템이 존재하지 않음");
        return "아이템 없음";
      }
    } catch (error) {
      console.error("재료 아이템을 가져오는 중 오류가 발생했습니다.", error);
      setIdStatus("오류 발생");
      return "오류";
    }
  };

  // 하위 재료 입력 핸들러
  const handleComponentChange = async (e) => {
    const { name, value } = e.target;
    setNewComponent((prev) => ({ ...prev, [name]: value }));

    if (name === "name" && value) {
      const id = await fetchComponentId(value);
      setNewComponent((prev) => ({ ...prev, id: id }));
    }
  };

  // 하위 재료 추가 핸들러
  const handleAddComponent = () => {
    if (
      newComponent.name &&
      newComponent.quantity &&
      newComponent.id !== "아이템 없음"
    ) {
      setComponents((prev) => [...prev, newComponent]);
      setNewComponent({ name: "", quantity: 1, id: "" });
      setIdStatus("");
    } else {
      alert("유효한 재료 이름과 수량을 입력해 주세요.");
    }
  };

  // 하위 재료 삭제 핸들러
  const handleDeleteComponent = (index) => {
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-xl font-semibold mb-2">하위 재료 추가</h3>
      <div className="grid grid-cols-3 gap-2 items-center">
        <input
          type="text"
          name="name"
          value={newComponent.name}
          onChange={handleComponentChange}
          placeholder="하위 재료 이름"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          value={newComponent.quantity}
          onChange={handleComponentChange}
          placeholder="수량"
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddComponent}
          className="p-2 bg-green-500 text-white rounded"
        >
          추가
        </button>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {idStatus} {/* ID 상태 표시 */}
      </div>
      <div className="mt-2">
        {components.map((component, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <span className="block font-semibold">이름: {component.name}</span>
            <span className="block font-semibold">ID: {component.id}</span>
            <span className="block font-semibold">
              수량: {component.quantity}
            </span>
            <button
              onClick={() => handleDeleteComponent(index)}
              className="p-1 bg-red-500 text-white rounded"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
