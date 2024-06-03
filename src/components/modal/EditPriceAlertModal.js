import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { removePriceAlert, updatePriceAlert } from "../../modules/priceAlert";
import SuccessModal from "./SuccessModal";

Modal.setAppElement("#root");

const EditPriceAlertModal = ({ isOpen, onRequestClose, item }) => {
  const { priceAlerts } = useSelector((state) => state.priceAlert);
  const [alert, setAlert] = useState(null);
  const [priceThreshold, setThreshold] = useState("");
  const inputRef = useRef(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();

  // item의 alert 찾기
  useEffect(() => {
    if (item && priceAlerts.length > 0) {
      const foundAlert = priceAlerts.find(
        (alert) => alert.itemId === item.id && alert.itemSid === item.sid,
      );
      if (foundAlert) {
        setAlert(foundAlert);
        setThreshold(foundAlert.priceThreshold.toLocaleString());
      }
    }
  }, [item, priceAlerts]);

  const handlePriceChange = (e) => {
    const { value, selectionStart, selectionEnd } = e.target;
    const rawValue = value.replace(/,/g, "");
    if (!isNaN(rawValue)) {
      const formattedValue = Number(rawValue).toLocaleString();
      setThreshold(formattedValue);

      // 다음 렌더링 후 커서 위치를 복원
      setTimeout(() => {
        const newCursorPosition =
          selectionStart + (formattedValue.length - value.length);
        inputRef.current.setSelectionRange(
          newCursorPosition,
          newCursorPosition,
        );
      }, 0);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const rawPrice = priceThreshold.replace(/,/g, ""); // 쉼표 제거 후 API 호출
      await dispatch(updatePriceAlert(alert._id, rawPrice));
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating price alert:", error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("handleDelete:", alert);
      await dispatch(removePriceAlert(alert._id));
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error deleting price alert:", error);
    }
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
        <h2 className="text-2xl font-bold mb-4">가격 알림 수정</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              알림 가격:
            </label>
            <input
              type="text"
              value={priceThreshold}
              onChange={handlePriceChange}
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
              수정
            </button>
            <button
              onClick={() => handleDelete()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2"
            >
              삭제
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
        isOpen={showSuccessModal}
        onRequestClose={() => {
          setShowSuccessModal(false);
          onRequestClose();
        }}
      />
    </>
  );
};

export default EditPriceAlertModal;
