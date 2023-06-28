import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import EditPatient from './EditPatient';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AsyncDataEditPatient() {
    const data = jwtDecode(localStorage.getItem("accessToken"));
    const [patient, setPatient] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (data?.sub) {
            navigate("/");
            return;
        };
        axios.get(`http://localhost:8080/patient/username/${data.sub}`)
            .then(resp => {
                setPatient(resp.data);
            })
    }, []);
    return (
        <div>
            {patient?.idPatient ? <EditPatient patient={patient} /> : <h1>Loading ...</h1>}
        </div>
    )
}
