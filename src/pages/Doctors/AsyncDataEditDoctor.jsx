import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios';
import EditDoctor from './EditDoctor';
import { useNavigate } from 'react-router-dom';

export default function AsyncDataEditDoctor() {
    const data = jwtDecode(localStorage.getItem("accessToken"));
    const [doctor, setDoctor] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (data?.aud !== "DOCTOR") {
            navigate("/");
            return;
        };
        axios.get(`http://localhost:8080/doctor/username/${data.sub}`)
            .then(resp => {
                setDoctor(resp.data);
            })
    }, []);
    return (
        <React.Fragment>
            {doctor?.idDoctor ? <EditDoctor doctor={doctor} /> : <p>Loading...</p>}
        </React.Fragment>
    )
}
