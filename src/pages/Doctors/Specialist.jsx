import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './specialist.css';

import axios from 'axios';

export default function Specialist() {
    const [specialists, setSpecialists] = useState([]);

    const [render, setRender] = useState(false);

    useEffect(() => {
        try {
            axios.get('http://localhost:8080/specialist/get-all').then((response) => {
                setSpecialists(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, [render]);
    return (
        <div className="container-fluid">
            <div className="">
                <div className="specialist d-flex align-items-center">
                    <h5 className="text-uppercase">Vui lòng chọn dịch vụ khám</h5>
                </div>
            </div>
            <div>
                <ul>
                    {specialists.length > 0 &&
                        specialists.map((item) => (
                            <Link to={`/doctor-list?idSPL=${item.idSPL}`}>
                                <li>
                                    <img src={item.imageUrl} alt="okay" />
                                    <h3>{item.name}</h3>
                                </li>
                            </Link>
                        ))}
                </ul>
            </div>
        </div>
    );
}
