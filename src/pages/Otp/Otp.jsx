import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase";
import UploadFirebase from "@/utils/upload/UploadFirebase";
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import ErrorMessage from '@/components/common/NotFound/ErrorMessage';
export default function Otp() {

    const navigate = useNavigate();
    const location = useLocation();
    const [wrongOTP, setWrongOTP] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        if (data.otp.toLowerCase() === location.state.data.otp.toLowerCase()) {
            const url = location.state.data.url;
            delete location.state.data.url;
            delete location.state.data.otp;
            const folderRef = ref(storage, "image");
            const timestamp = Date.now();
            const fileName = `${timestamp}_${location.state.data.avatarUrl.name}`;
            const fileRef = ref(folderRef, fileName);
            const uploadTask = uploadBytesResumable(fileRef, location.state.data.avatarUrl);
            console.log(location.state.data)
            uploadTask.on("state_changed",
                (snapshot) => {
                    console.log(snapshot);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        location.state.data.avatarUrl = downloadURL;
                        axios.post(url, location.state.data).then(resp => {
                            if (resp.status === HttpStatusCode.Created) {
                                navigate("/");
                            }
                        })
                        return;
                    });
                })
            return;
        }
        setWrongOTP("Wrong OTP");
    }

    useEffect(() => {
        console.log(location.state);
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit} >
                <input name="otp" placeholder='otp' />
                <button>submit</button>
            </form>
            {wrongOTP && <ErrorMessage messageId={wrongOTP} />}
        </div>
    )
}
