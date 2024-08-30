import React, { useState } from "react";

// 새로운 필드 추가
export default function FieldManager({ formData, setFormData }) {
  const [newField, setNewField] = useState({ key: "", value: "" }); // State for new field input

  // Input change handler for new field inputs
  const handleNewFieldChange = (e) => {
    const { name, value } = e.target;
    setNewField((prevNewField) => ({
      ...prevNewField,
      [name]: value,
    }));
  };

  // Handler to add new field to formData
  const handleAddField = () => {
    if (newField.key && newField.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [newField.key]: newField.value,
      }));
      setNewField({ key: "", value: "" }); // Reset the new field input
    } else {
      alert("키와 값을 입력해 주세요.");
    }
  };

  return (
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
  );
}
