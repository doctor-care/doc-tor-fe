import React, { useEffect } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase";
import UploadFirebase from "@/utils/upload/UploadFirebase";
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
export default function Otp() {
    const navigate = useNavigate();
    const location = useLocation();
    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        if (data.otp === location.state.data.otp) {
            const folderRef = ref(storage, "image");
            const timestamp = Date.now();
            const fileName = `${timestamp}_${location.state.data.avatarUrl[0].name}`;
            const fileRef = ref(folderRef, fileName);
            const uploadTask = uploadBytesResumable(fileRef, location.state.data.avatarUrl);
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
                        axios.post("http://localhost:8080/patient/signup", location.state.data).then(resp => {
                            if (resp.status === HttpStatusCode.Created) {
                                navigate("/");
                            }
                        })
                        return;
                    });
                })
        }
    }

    useEffect(() => {
        console.log(location.state);
    }, [])
    return (
        <div>
            <form onSubmit={onSubmit} >
                <input name="otp" placeholder='otp' />
                <button>submit</button>
            </form>
        </div>
    )
}
