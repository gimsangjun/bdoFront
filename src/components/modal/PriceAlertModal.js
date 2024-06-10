import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import ItemAPI from "../../utils/itemAPI";
import SuccessModal from "./SuccessModal";

const PriceAlertModal = ({ isOpen, onRequestClose, item }) => {
  const [priceThreshold, setPriceThreshold] = useState(0);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const inputRef = useRef(null);

  // 초기값 로딩
  useEffect(() => {
    if (item) {
      const initialPrice = item.lastSoldPrice
        ? item.lastSoldPrice
        : item.basePrice;
      setPriceThreshold(initialPrice); // 초기 값도 쉼표를 추가하여 설정
    }
  }, [item]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rawPrice = Number(priceThreshold.replace(/,/g, "")); // 쉼표 제거 후 숫자로 변환
    const { status } = await ItemAPI.addItemPriceAlert(item, rawPrice);

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
            {/* TODO: 나중에 가격 보기 쉽게 ,로 보이게 할수 있을듯. */}
            <input
              type="number"
              value={priceThreshold}
              onChange={(e) => setPriceThreshold(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={inputRef}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              등록
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
