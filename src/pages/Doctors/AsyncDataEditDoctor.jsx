import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios';
import EditDoctor from './EditDoctor';

export default function AsyncDataEditDoctor() {
    const data = jwtDecode(localStorage.getItem("accessToken"));
    const [doctor, setDoctor] = useState({
        "idDoctor": "DT001",
        "avatarUrl": "https://firebasestorage.googleapis.com/v0/b/projectspring1-3a404.appspot.com/o/image%2F1687836629986_320583871_521513046593174_5308853464069026366_n.jpg?alt=media&token=09c82abc-9868-47fa-9aba-765212ae1680",
        "phone": "0904213222",
        "name": "le thai khang",
        "birthday": "1990-11-11",
        "address": "43 can giuoc",
        "sex": "Nam",
        "city": "48",
        "district": "495",
        "description": "chien than1231231"
    });
    useEffect(() => {
        // axios.get(`http://localhost:8080/doctor/username/${data.sub}`)
        //     .then(resp => {
        //         // setDoctor(resp.data);
        //     })
    }, []);
    console.log(doctor)
    return (

        <React.Fragment>
            {doctor?.idDoctor ? <EditDoctor doctor={doctor} /> : <p>Loading...</p>}
        </React.Fragment>
    )
}
