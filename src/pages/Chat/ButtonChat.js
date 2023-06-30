import { useState, useEffect, useRef } from "react";
import "./ButtonChat.css";

function ButtonChat({ onOpen, isOpen, onClose, onClick }) {
  return (
    <button
      onClick={isOpen ? onClose : onOpen}
      className="round-button"
      style={{ bottom: "40px", right: "30px" }}
    >
      Nhắn tin
    </button>
  );
}

export default ButtonChat;