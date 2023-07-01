import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactModal from "react-modal";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

var stompClient = null;
const WinChat = ({ isOpen, onClose, children, user ,doctor}) => {
 
  const chatMessagesRef = useRef(null);
  const [listMessage, setListMessage] = useState([]);
  const [userData, setUserData] = useState({
      sender: user,
      reciptient: doctor,
      content: '',
      timestamp: '',
  });
  const [editable, setEditable] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [activeIndex, setActiveIndex] = useState('');
  const [componentOpened, setComponentOpened] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleButtonClick = () => {
      setEditable(true); // Cập nhật state của editable là true khi button được click
  };
  const handleClick = (name) => {
      setActiveIndex(name);
  };
  const handleSearch = (event) => {
      setSearchText(event.target.value);
      console.log('search text' + searchText);
  };
  const handleMessage = (event) => {
      if (!editable) {
          setEditable(true);
      }
      setButtonDisabled(false);
      const { value } = event.target;
      setUserData({ ...userData, content: value });
  };

  const handleComponentOpen = () => {
    setComponentOpened(true);
  };
  const handleComponentClose = () => {
    setComponentOpened(false);
  };
  useEffect(() => {
    axios
            .get(`http://localhost:8080/chat-box/getchat?sender=${doctor}&reciptient=${user}`)
            .then((response) => {
                const data = response.data;
                setListMessage(data);
            })
    if (user !== '') {
        connect();
    }
}, [user]);
  const connect = () => {
      const Sock = new SockJS("http://localhost:8080/chat");
      stompClient = over(Sock);
      stompClient.connect({}, onConnected);
  };


  const onConnected = () => {
      stompClient.subscribe("/user/" + user + "/queue/messages", (message) => {
          //  if(reciptientnamecurrent!==""&&reciptientnamecurrent===message.body.sender){
          setListMessage((listMessage) => [
              ...listMessage,
              JSON.parse(message.body),
          ]);
          console.log('userData.content:', userData.content);
          console.log('stompClient:', stompClient);
          console.log('stompClient.connected:', stompClient.connected);
          console.log(listMessage, "Day la list message sau khi nhan dc message");
      });
      console.log("WebSocket connected"); // Thêm log để kiểm tra kết nối WebSocket
  };
  const handleKeyDown = (event) => {
      if (event.key === 'Enter' && userData.content !== '') {
          sendPrivateValue(); // Gọi hàm xử lý khi người dùng nhấn phím Enter
      }
  };

  const sendPrivateValue = () => {
      if (stompClient && stompClient.connected) {
          if (userData.content !== "") {
              setUserData({ ...userData, reciptient: doctor });
              setUserData({ ...userData, sender: user });
              const message = userData;
              message.sender = user;
              message.reciptient = doctor;
              console.log(message, "day la message truoc khi gui");
              stompClient.send(`/app/message`, {}, JSON.stringify(message));
              setUserData({ ...userData, content: "" });
          } else {
              alert("Hãy nhập nội dung cho tin nhắn!!");
          }
      } else {
          alert("Kết nối WebSocket chưa được thiết lập.");
      }
  };




  useEffect(() => {
      if (componentOpened && chatMessagesRef.current) {
          const chatMessages = chatMessagesRef.current;
          chatMessages.scrollTop = chatMessages.scrollHeight - chatMessages.clientHeight;
      } else if (!componentOpened && chatMessagesRef.current) {
          const chatMessages = chatMessagesRef.current;
          const callback = () => {
              chatMessages.scrollTop = chatMessages.scrollHeight - chatMessages.clientHeight;
          };
          requestAnimationFrame(callback);
      }
  }, [componentOpened, listMessage]);

  

  


  return (
    <div className="chat">
      {user !== "admin" && (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Example Modal"
          overlayClassName="chat-overlay"
          portalClassName="chat-portal"
          className="my-modal"
          onAfterOpen={handleComponentOpen}
          onAfterClose={handleComponentClose}
        >
          {children}
          <div className="user-info">
            <div className="user-name">
              <span className="user">{doctor}</span> 
            </div>
            <button onClick={onClose} className="btn-x">
              X
            </button>
          </div>
          <div className="container">
            <div className="chat-box-user">
              <div className="chat-content-user">
                <div className="chat-user">
                  <ul className="chat-messages-user" ref={chatMessagesRef}>
                    {console.log("Day la listmessage ben user", listMessage)}
                    {Array.isArray(listMessage) &&
                      listMessage.map((chat, index) => (
                        <li
                          className={`message ${
                            chat.sender !== "admin" ? "self" : "client"
                          }`}
                          key={index}
                        >
                          <div className="message-data">{chat.content}</div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="send-message-user">
                  <input
                    type="text"
                    className="input-message"
                    placeholder="Nhập tin nhắn"
                    value={userData.content}
                    onChange={handleMessage}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    type="button"
                    className="send-chat"
                    onClick={sendPrivateValue}
                    disabled={buttonDisabled}
                  >
                    <i class="fa-regular fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {user === "" && (
            <div>
              <h2>Khong co user</h2>
            </div>
          )}

          {children}
        </ReactModal>
      )}
    </div>
  );
};

export default WinChat;
