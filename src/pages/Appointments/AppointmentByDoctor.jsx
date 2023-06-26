import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AppointmentByDoctor() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    //search doctor from attribute
    const [doctorId, setDoctorId] = useState(queryParams.get('doctorId'));
    const [date, setDate] = useState([]);
    const [dateSearch, setDateSearch] = useState('');
    const [appointmentList, setAppointmentList] = useState([]);

    const handleInputChange = (event) => {
        setDateSearch(event.target.value);
    };

    useEffect(() => {
        getAppointmentDateList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doctorId]);

    useEffect(() => {
        getAppointmentList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateSearch]);

    const getAppointmentList = () => {
        try {
            axios
                .get('http://localhost:8080/appointment/get-list?doctorId=' + doctorId + '&dateSearch=' + dateSearch)
                .then((response) => {
                    setAppointmentList(response.data);
                    console.log('setAppointmentList', response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getAppointmentDateList = () => {
        try {
            axios.get('http://localhost:8080/appointment/get-date?doctorId=' + doctorId).then((response) => {
                setDate(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="">
                <div className="d-flex align-items-center">
                    <h5 className="text-uppercase">Div này để thông tin bác sĩ</h5>
                </div>
            </div>

            <div className="container">
                <div className="col-12 d-flex row">
                    <div className="col-2 text-uppercase fw-bold">
                        <p>Chọn ngày khám:</p>
                    </div>
                    <div className="col-2">
                        <select name="date" id="date" onChange={handleInputChange} className="form-control text-center">
                            {date.length === 0 && <option value="">-- Chọn ngày --</option>}
                            {date.map((date) => (
                                <option key={date} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div className="col-6 d-flex">
                        {appointmentList.map((app) => (
                            <div key={app.idAPM} className="col-3 text-center bg-info m-1">
                                <Link to={`/booking-schedule?idAPM=${app.idAPM}`} className="text-decoration-none">
                                    {app.shifts.shiftsName}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
