import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import ErrorMessage from '@/components/common/NotFound/ErrorMessage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

export default function Otp() {
    const navigate = useNavigate();
    const location = useLocation();
    const [wrongOTP, setWrongOTP] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        if (data.otp.toLowerCase() === location.state.data.otp.toLowerCase()) {
            const url = location.state.data.url;
            delete location.state.data.url;
            delete location.state.data.otp;
            const folderRef = ref(storage, 'image');
            const timestamp = Date.now();
            const fileName = `${timestamp}_${location.state.data.avatarUrl.name}`;
            const fileRef = ref(folderRef, fileName);
            const uploadTask = uploadBytesResumable(fileRef, location.state.data.avatarUrl);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    console.log(snapshot);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        location.state.data.avatarUrl = downloadURL;
                        toast.success('ĐĂNG KÝ THÀNH CÔNG');
                        axios.post(url, location.state.data).then((resp) => {
                            if (resp.status === HttpStatusCode.Created) {
                                navigate('/');
                            } else {
                                return <div>Loading...</div>;
                            }
                        });
                        return;
                    });
                },
            );
            return;
        }
        setWrongOTP('Wrong OTP');
    };

    useEffect(() => {
        console.log(location.state);
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit} className="flex justify-center items-center h-full ">
                <div className="sm:px-0 px-4 md-screen-otp ">
                    <div className="flex justify-center py-2">
                        <div>
                            <img src="/logo.png" alt="logo" className="w-56 h-20 object-cover" />
                        </div>
                    </div>
                    <p className="text-center text-2xl font-bold"> Xác thực OTP</p>
                    <p className="font-medium text-center">Xin vui lòng nhập mã OTP đã được gửi đến email của bạn</p>
                    <div>
                        <input
                            name="otp"
                            placeholder="OTP"
                            className="mt-3 peer h-8 w-full border rounded px-2 py-4 bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                    </div>
                    <button className="btn-otp mt-3 inline-block rounded border border-blue-600 px-12 py-3 text-sm font-medium text-blue-600  hover:bg-blue-600  hover:text-white focus:outline-none focus:ring active:bg-indigo-500 w-full">
                        Xác nhận
                    </button>
                </div>
            </form>
            {wrongOTP && <ErrorMessage messageId={wrongOTP} />}
        </div>
    );
}
