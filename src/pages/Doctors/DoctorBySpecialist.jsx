import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './doctor-by-specialist.css';

import axios from 'axios';

export default function DoctorBySpecialist() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    //search doctor from attribute
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalElement, setTotalElement] = useState(0);
    const [idAddress, SetIdAddress] = useState('');
    const [idSPL, setIdSPL] = useState(queryParams.get('idSPL'));
    const [doctors, setDoctors] = useState([]);
    const [date, setDate] = useState([]);

    useEffect(() => {
        console.log('idAddress', idAddress);
        console.log('idSPL', idSPL);
        console.log('page', page);
        console.log('size', size);
        fetchDoctorList();
        getAppointmentDateList('DT001');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, size, idAddress, idSPL]);

    const fetchDoctorList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/doctor/page-search', {
                params: {
                    idAddress,
                    idSPL,
                    page,
                    size,
                },
            });
            console.log('RESPONSE LIST DATAA', response);
            setDoctors(response.data.content);
            setTotalElement(response.data.totalElements);
        } catch (error) {
            console.log(error);
        }
    };

    const getAppointmentDateList = (doctorId) => {
        try {
            axios.get('http://localhost:8080/appointment/getdate?doctorId=' + doctorId).then((response) => {
                console.log('return response.data', response);
                setDate(response.data);
                console.log('date', date);
                // console.log('date', date)
            });
        } catch (error) {
            console.log(error);
            console.log('ERROR HERE');
        }
    };

    console.log('doctors', doctors);
    return (
        <div className="container-fluid">
            <div className="">
                <div className="d-flex align-items-center">
                    <h5 className="text-uppercase">danh sách bác sĩ theo chuyên khoa</h5>
                </div>
            </div>
            <div className="">
                <div className="d-flex align-items-center">
                    <h5 className="text-uppercase">div này để chọn quận huyện</h5>
                </div>
            </div>
            <div className="container">
                {doctors.map((item) => (
                    <div key={item.idDoctor} className="doctor-content mb-3">
                        <div className="col-md-12 row">
                            <div className="col-md-6">
                                <div>{item.name}</div>
                                <div>THÔNG TIN THÊM</div>
                            </div>
                            <div className="col-md-6">
                                {/* <div>
                                    {getAppointmentDateList(item.doctorId).map((date) => (
                                        <span>date</span>
                                    ))}
                                </div> */}
                                <div>LIST APPOINTMENT</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
