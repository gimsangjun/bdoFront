import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { removePriceAlert, updatePriceAlert } from "../../modules/priceAlert";
import SuccessModal from "./SuccessModal";

Modal.setAppElement("#root");

const EditPriceAlertModal = ({ isOpen, onRequestClose, item }) => {
  const { priceAlerts } = useSelector((state) => state.priceAlert);
  const [alert, setAlert] = useState("");
  const [priceThreshold, setThreshold] = useState(0);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();

  // item의 alert 찾기
  useEffect(() => {
    if (item && priceAlerts.length > 0) {
      const alert = priceAlerts.find(
        (alert) => alert.itemId === item.id && alert.itemSid === item.sid,
      );
      if (alert) {
        setAlert(alert);
        setThreshold(alert.priceThreshold);
      }
    }
  }, [item, priceAlerts]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePriceAlert(alert._id, priceThreshold));
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
              type="number"
              value={priceThreshold}
              onChange={(e) => setAlert(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
