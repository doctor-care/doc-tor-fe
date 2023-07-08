import React, { useEffect, useState, useRef } from 'react';

import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import './Chat.css';
import axios from 'axios';

var stompClient = null;
const Chat = ({ user }) => {
    const [listUserNew, setListUserNew] = useState([]);
    const chatMessagesRef = useRef(null);
    const [listUser, setListUser] = useState([]);
    const [listAllUser, setListALLUser] = useState([]);
    const [listMessage, setListMessage] = useState([]);
    const [reciptientname, setReciptientName] = useState('');
    const [reciptientnamecurrent, setReciptientNamecurrent] = useState('');
    const [userData, setUserData] = useState({
        sender: user,
        reciptient: '',
        content: '',
        timestamp: '',
    });
    const [editable, setEditable] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [activeIndex, setActiveIndex] = useState('');
    const [componentOpened, setComponentOpened] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [listAvatar, setListAvatar] = useState([]);

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

    const connect = () => {
        const Sock = new SockJS('http://localhost:8080/chat');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected);
    };

    const onConnected = () => {
        stompClient.subscribe('/user/' + user + '/queue/messages', (message) => {
            //  if(reciptientnamecurrent!==""&&reciptientnamecurrent===message.body.sender){
            setListMessage((listMessage) => [...listMessage, JSON.parse(message.body)]);
            console.log('userData.content:', userData.content);
            console.log('stompClient:', stompClient);
            console.log('stompClient.connected:', stompClient.connected);
            console.log(listMessage, 'Day la list message sau khi nhan dc message');
        });
        console.log('WebSocket connected'); // Thêm log để kiểm tra kết nối WebSocket
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && userData.content !== '') {
            sendPrivateValue(); // Gọi hàm xử lý khi người dùng nhấn phím Enter
        }
    };

    const sendPrivateValue = () => {
        if (stompClient && stompClient.connected && stompClient.ws.readyState === 1) {
            if (userData.content !== '') {
                setUserData({ ...userData, reciptient: reciptientname });
                setUserData({ ...userData, sender: user });
                const message = userData;
                message.sender = user;
                message.reciptient = reciptientname;
                console.log(message, 'day la message truoc khi gui');
                stompClient.send(`/app/message`, {}, JSON.stringify(message));
                setUserData({ ...userData, content: '' });
            } else {
                alert('Hãy nhập nội dung cho tin nhắn!!');
            }
        } else {
            alert('Kết nối WebSocket chưa được thiết lập.');
        }
    };

    function getChat(name) {
        console.log('name', name);
        axios
            .delete(`http://localhost:8080/chat-box/delete-new-message?user=${name}&reciptient=${user}`)
            .catch((error) => console.error);
        updateListUserNew();
        axios
            .get(`http://localhost:8080/chat-box/getchat?sender=${name}&reciptient=${user}`)
            .then((response) => {
                const data = response.data;
                setListMessage(data);
            })
            .catch((error) => console.error);
        setReciptientName(name);
        console.log('ListMessage', listMessage);

        if (chatMessagesRef.current) {
            const chatMessages = chatMessagesRef.current;
            chatMessages.scrollTop = chatMessages.scrollHeight - chatMessages.clientHeight;
        }
        handleClick(name);
        handleButtonClick();
        setReciptientNamecurrent(name);
    }
    useEffect(() => {
        if (searchText !== '') {
            const filteredUsers = listAllUser.filter((user) => user.toLowerCase().includes(searchText.toLowerCase()));
            setListUser(filteredUsers);
            console.log("searchText",searchText);
        } else {
            axios
                .get(`http://localhost:8080/chat-box/list-user?user=${user}`)
                .then((response) => {
                    const data = response.data;
                    setListUser(data);
                })
                .catch((error) => console.error);
        }
    }, [searchText, listUserNew]);
    const updateListUserNew = () => {
        axios
            .get(`http://localhost:8080/chat-box/new-message?reciptient=${user}`)
            .then((response) => {
                const data = response.data;
                setListUserNew(data);
            })
            .catch((error) => console.error);
    };

    useEffect(() => {
        console.log('day la listmessage mới');
        if (searchText === '') {
            axios
                .get(`http://localhost:8080/chat-box/list-user?user=${user}`)
                .then((response) => {
                    const data = response.data;
                    setListUser(data);
                })
                .catch((error) => console.error);
        }

        console.log('day la listmessage', listMessage);
        console.log('day la listUserNew truoc khi them: ', listUserNew);
        if (Array.isArray(listMessage) && listMessage.length > 0) {
            const lastms = listMessage[listMessage.length - 1]?.sender;
            if (lastms && lastms !== reciptientnamecurrent && lastms !== user) {
                console.log('Day la last message', lastms);
                console.log('Day la reciptientnamecurrent', reciptientnamecurrent);
                axios
                    .get(`http://localhost:8080/chat-box/save-new-message?user=${lastms}&reciptient=${user}`)
                    .catch((error) => console.error);
                getChat(reciptientnamecurrent);
            }
        }
    }, [listMessage]);

    useEffect(() => {
        updateListUserNew();
    }, [listMessage]);

    useEffect(() => {
        updateListUserNew();
        getChat('');
        setEditable(false);
        console.log(user);
    }, []);

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

    useEffect(() => {
        axios
            .get(`http://localhost:8080/chat-box/list-user?user=${user}`)
            .then((response) => {
                const data = response.data;
                setListUser(data);
                setListALLUser(data);
            })
            .catch((error) => console.error);
        axios
            .get(`http://localhost:8080/chat-box/new-message?reciptient=${user}`)
            .then((response) => {
                const data = response.data;
                setListUserNew(data);
            })
            .catch((error) => console.error);
        if (user !== '') {
            connect();
        }
        axios
            .get(`http://localhost:8080/doctor/avatar`)
            .then((response) => {
                const data = response.data;
                setListAvatar(data);
            })
            .catch((error) => console.error);
    }, [user]);

    return (
        <div className="chat">
            <div className="tieu-de">
                <div className="wrap">CHĂM SÓC KHÁCH HÀNG</div>
            </div>
            <div className="chat-box">
                <div className="member-list">
                    <input
                        className="btn-search"
                        type="text"
                        value={searchText}
                        onChange={handleSearch}
                        placeholder="Nhập tên khách hàng"
                    />
                    <ul className="list-member">
                        {listUser.length > 0 &&
                            listUser.map((item, index) => {
                                if (item !== (user !== '' ? user : '')) {
                                    let avatar = null;
                                    if (Array.isArray(listAvatar)) {
                                        avatar = listAvatar.find((avatar) => avatar.userName === item);
                                    }
                                    return (
                                        <li key={index}>
                                            <button
                                                className={activeIndex === item ? 'active btn-li' : 'btn-li'}
                                                onClick={() => getChat(item)}
                                            >
                                            {avatar ? (
                                                <img
                                                    className="avatar-chat"
                                                    key={avatar.urlAvatar}
                                                    src={avatar.urlAvatar}
                                                    alt="Preview"
                                                />
                                            ) : (
                                                <img
                                                    className="avatar-chat"
                                                    key='1'
                                                    src={'https://cdn1.iconfinder.com/data/icons/windows-10-1/32/Administrator-512.png'}
                                                    alt="Preview"
                                                />
                                            )}
                                            <div className='nameUser'>{item}</div>
                                               
                                            </button>
                                            {listUserNew.find((newUser) => newUser.user === item) && (
                                                <div className="btn-new">{`${
                                                    listUserNew.find((newUser) => newUser.user === item).quatity
                                                }`}</div>
                                            )}
                                        </li>
                                    );
                                }
                                return null;
                            })}
                    </ul>
                </div>
                <div className="chat-content">
                    <div className="chat-wrap-ul">
                        {editable && (
                            <ul className="chat-messages" ref={chatMessagesRef} onLoad={handleComponentOpen}>
                                {console.log('Day la listmessage ben admin', listMessage)}
                                {Array.isArray(listMessage) &&
                                    listMessage.map(
                                        (chat, index) =>
                                            (chat.sender === reciptientnamecurrent ||
                                                chat.sender === (user !== '' ? user : '')) && (
                                                <li
                                                    className={`message ${
                                                        chat.sender === (user !== '' ? user : '') ? 'self' : 'client'
                                                    }`}
                                                    key={index}
                                                >
                                                    <div className="message-data">{chat.content}</div>
                                                </li>
                                            ),
                                    )}
                            </ul>
                        )}
                    </div>

                    <div className="send-message">
                        <input
                            type="text"
                            className="input-message"
                            placeholder="Nhập tin nhắn"
                            value={userData.content}
                            onChange={handleMessage}
                            onKeyDown={handleKeyDown}
                            readOnly={!editable}
                        />
                        <button
                            type="button"
                            className="send-chat"
                            onClick={sendPrivateValue}
                            disabled={buttonDisabled}
                        >
                            <i className="fa-regular fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
