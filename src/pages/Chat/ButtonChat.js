import { useState, useEffect, useRef } from "react";
import "./ButtonChat.css";

function ButtonChat({ onOpen, isOpen, onClose }) {
  return (
    <button
      onClick={isOpen ? onClose : onOpen}
      className="button"
      style={{ bottom: "40px", right: "30px" }}
    >
      Nhắn tin
    </button>
  );
}

export default ButtonChat;