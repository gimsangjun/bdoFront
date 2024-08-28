import React, { useState } from "react";
import ItemInfoUpdateAPI from "../../../utils/itemInfoUpdateAPI"; // API 호출을 위한 유틸리티

// 하위 재료 관련 컴포넌트
export default function SubIngredientManager({ ingredients, setIngredients }) {
  const [newIngredient, setNewIngredient] = useState({
    id: "",
    amount: 1,
  }); // 새 재료 추가를 위한 상태
  const [ingredientName, setIngredientName] = useState(""); // 하위 재료 이름을 저장할 상태

  // 하위 재료 입력 핸들러
  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient((prevIngredient) => ({
      ...prevIngredient,
      [name]: value,
    }));

    if (name === "id") {
      // 재료 ID 변경 시 이름 가져오기
      fetchIngredientName(value);
    }
  };

  // 새 하위 재료 추가 핸들러
  const handleAddIngredient = () => {
    if (newIngredient.id && newIngredient.amount) {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        {
          id: newIngredient.id,
          amount: parseInt(newIngredient.amount),
          name: ingredientName,
        },
      ]);
      setNewIngredient({ id: "", amount: 1 }); // 재료 추가 후 초기화
      setIngredientName(""); // 재료 이름 초기화
    } else {
      alert("재료 ID와 수량을 입력해 주세요.");
    }
  };

  // 하위 재료 삭제 핸들러
  const handleDeleteIngredient = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index),
    );
  };

  // 재료 ID로 이름을 가져오는 함수
  const fetchIngredientName = async (ingredientId) => {
    try {
      const data = await ItemInfoUpdateAPI.getItems({ id: ingredientId });
      if (data.items.length > 0) {
        setIngredientName(data.items[0].name);
      } else {
        setIngredientName("이름 없음");
      }
    } catch (error) {
      console.error("재료 이름을 가져오는 중 오류가 발생했습니다.", error);
      setIngredientName("오류");
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-xl font-semibold mb-2">하위 재료 추가</h3>
      <div className="grid grid-cols-3 gap-2 items-center">
        <input
          type="text"
          name="id"
          value={newIngredient.id}
          onChange={handleIngredientChange}
          placeholder="재료 ID"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          value={newIngredient.amount}
          onChange={handleIngredientChange}
          placeholder="수량"
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddIngredient}
          className="p-2 bg-green-500 text-white rounded"
        >
          추가
        </button>
      </div>
      {/* 추가된 하위 재료 목록 표시 */}
      {ingredientName && (
        <div className="mt-2 text-sm text-gray-600">
          현재 입력된 재료 이름: {ingredientName}
        </div>
      )}
      <div className="mt-2">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <span className="block font-semibold">이름: {ingredient.name}</span>
            <span className="block font-semibold">ID: {ingredient.id}</span>
            <span className="block font-semibold">
              수량: {ingredient.amount}
            </span>
            <button
              onClick={() => handleDeleteIngredient(index)}
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
