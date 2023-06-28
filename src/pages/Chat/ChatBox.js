import Chat from './Chat';
import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';

export default function ChatBox() {
    const [user, setUser] = useState('');
    useEffect(() => {
        const userLogin = localStorage.getItem('userName');
        if (userLogin) {
            setUser(userLogin);
             } else {
                const now = new Date();
                const dateString = format(now, 'yyyyMMddHHmmssSSS');
                setUser(dateString);
            }
    }, []);
    return (
        <div>
            <Chat user={user}></Chat>
        </div>
    );
}
