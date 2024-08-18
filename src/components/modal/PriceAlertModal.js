import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import SuccessModal from "./SuccessModal";
import ItemAPI from "../../utils/itemAPI";

const PriceAlertModal = ({ isOpen, onRequestClose, item }) => {
  const [priceThreshold, setPriceThreshold] = useState(0);
  const [alertCondition, setAlertCondition] = useState("below"); // alertCondition 상태 추가
  const [errorMessage, setErrorMessage] = useState("");
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const inputRef = useRef(null);

  // 초기값 로딩
  useEffect(() => {
    if (item) {
      const initialPrice = item.lastSoldPrice
        ? item.lastSoldPrice
        : item.basePrice;
      setPriceThreshold(initialPrice);
    }
  }, [item]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { status, message } = await ItemAPI.addItemPriceAlert(
      item,
      priceThreshold,
      alertCondition,
    );
    if (status === 201) {
      setSuccessModalIsOpen(true);
      onRequestClose();
    } else {
      setErrorMessage(message);
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
          setErrorMessage("");
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
              onChange={(e) => setPriceThreshold(Number(e.target.value))}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={inputRef}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              알림 조건:
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="alertCondition"
                  value="below"
                  checked={alertCondition === "below"}
                  onChange={() => setAlertCondition("below")}
                  className="form-radio"
                />
                <span className="ml-2">기준가 이하</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="alertCondition"
                  value="above"
                  checked={alertCondition === "above"}
                  onChange={() => setAlertCondition("above")}
                  className="form-radio"
                />
                <span className="ml-2">기준가 이상</span>
              </label>
            </div>
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
                setErrorMessage("");
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
