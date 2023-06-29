import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AppointmentFromDoctor.css';

export default function AppointmentFromDoctor() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    //search doctor from attribute
    const [doctorId] = useState(queryParams.get('doctorId'));
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
        getAppointmentList(dateSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateSearch]);

    const getAppointmentList = (date) => {
        try {
            axios
                .get('http://localhost:8080/appointment/get-list?doctorId=' + doctorId + '&dateSearch=' + date)
                .then((response) => {
                    setAppointmentList(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getAppointmentDateList = () => {
        try {
            axios.get('http://localhost:8080/appointment/get-date?doctorId=' + doctorId).then((response) => {
                setDate(response.data);
                getAppointmentList(response.data[0]);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChoice = (id) => {
        navigate('/booking-schedule?idAPM=' + id);
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
                            <div
                                key={app.idAPM}
                                className={`col-3 text-center m-1 shift ${
                                    app.statusAPM === 2 ? 'selected' : 'not-selected'
                                } `}
                            >
                                <button
                                    className={`text-decoration-none ${app.statusAPM === 2 ? 'not-allow' : 'allow'} `}
                                    title={app.statusAPM === 2 ? 'LỊCH ĐÃ ĐƯỢC ĐẶT' : 'CÓ THỂ CHỌN'}
                                    disabled={app.statusAPM === 2}
                                    onClick={app.statusAPM === 2 ? null : () => handleChoice(app.idAPM)}
                                >
                                    {app.shifts.shiftsName}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
