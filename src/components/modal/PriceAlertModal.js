import React, { useState } from "react";
import Modal from "react-modal";
import ItemAPI from "../../utils/itemAPI"; // 필요한 경우 경로를 수정하세요
import SuccessModal from "./SuccessModal"; // 성공 모달 컴포넌트 가져오기

Modal.setAppElement("#root");

const PriceAlertModal = ({ isOpen, onRequestClose, item }) => {
  const [price, setPrice] = useState("");
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { status } = await ItemAPI.addItemPriceAlert(item, price);

    if (status === 201) {
      setSuccessModalIsOpen(true);
      onRequestClose();
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "2rem",
            backgroundColor: "#f9fafb",
            borderRadius: "0.5rem",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
        className="relative bg-white rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4">가격 알림 설정</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              가격:
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              설정
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              취소
            </button>
          </div>
        </form>
      </Modal>
      <SuccessModal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
      />
    </>
  );
};

export default PriceAlertModal;
