import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './specialist.css';

import axios from 'axios';

export default function Specialist() {
    const [specialists, setSpecialists] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:8080/specialist/get-all').then((response) => {
                setSpecialists(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="container mt-16">
            <div className="row">
                {specialists.map((item, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <Link to={`/doctor-list?idSPL=${item.idSPL}`} className="card mt-2">
                            <img src={item.imageUrl} className="card-img-top" alt="Doctor" />
                            <div className="card-body">
                                <h3 className="card-title">{item.name}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
