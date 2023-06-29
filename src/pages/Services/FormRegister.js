import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactModal from 'react-modal';
import './FormRegister.css';

export default function FormService({ isOpen, onClose, idDT }) {
    const [componentOpened, setComponentOpened] = useState(false);
    const handleComponentOpen = () => {
        setComponentOpened(true);
    };
    const handleComponentClose = () => {
        setComponentOpened(false);
    };

    return (
        <div className="service">
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
                <div className="user-info">
                    <div className="user-name">
                        Xin chào <span className="user">{idDT}</span> !!!
                    </div>
                    <button onClick={onClose} className="btn-x">
                        X
                    </button>
                </div>
                <h1>{idDT}</h1>
            </ReactModal>
        </div>
    );
}
