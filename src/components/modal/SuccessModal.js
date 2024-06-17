import React from "react";
import Modal from "react-modal";

const SuccessModal = ({ isOpen, onRequestClose }) => {
  return (
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
          zIndex: 999,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 999,
        },
      }}
      className="relative bg-white rounded-lg shadow-lg w-96"
    >
      <h2 className="text-2xl font-bold mb-4">알림</h2>
      <p className="mb-4">가격 알림이 성공적으로 설정되었습니다.</p>
      <div className="flex justify-center">
        <button
          onClick={onRequestClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
