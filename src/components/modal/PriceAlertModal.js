import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import ItemAPI from "../../utils/itemAPI";
import SuccessModal from "./SuccessModal";

const PriceAlertModal = ({ isOpen, onRequestClose, item }) => {
  const [priceThreshold, setPriceThreshold] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가
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
    const { status, message } = await ItemAPI.addItemPriceAlert(
      item,
      priceThreshold,
    );
    if (status === 201) {
      setSuccessModalIsOpen(true);
      onRequestClose();
    } else if (status === 400 && message === "이미 존재하는 가격 알림입니다.") {
      setErrorMessage("이미 존재하는 가격 알림입니다.");
    } else {
      setErrorMessage("가격 알림 등록에 실패했습니다.");
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setErrorMessage(""); // 모달 닫을 때 에러 메시지 초기화
          onRequestClose();
        }}
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
            zIndex: 999,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 999,
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
              value={priceThreshold}
              onChange={(e) => setPriceThreshold(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={inputRef}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              등록
            </button>
            <button
              type="button"
              onClick={() => {
                setErrorMessage(""); // 취소 버튼 클릭 시 에러 메시지 초기화
                onRequestClose();
              }}
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
