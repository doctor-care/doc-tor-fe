import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
import './BookingSchedule.css';

export default function BookingSchedule() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [userName] = useState(localStorage.getItem('userName'));
    const [idAPM] = useState(queryParams.get('idAPM'));
    const [patient, setPatient] = useState({});
    const [isDisabled, setIsDisabled] = useState(false);

    const initalValues = {
        idAPM: Number(idAPM),
        createDate: Moment().format('YYYY-MM-DD HH:mm:ss'),
        statusSCD: 0,
        scheduleAddress: '',
        note: '',
    };
    const [formData, setFormData] = useState(initalValues);

    useEffect(() => {
        getPatientInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName]);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const getPatientInfo = () => {
        try {
            axios.get('http://localhost:8080/patient/' + userName).then((response) => {
                console.log('patient response', response.data);
                setPatient(response.data);
                formData.idPatient = response.data.idPatient;
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formValues', formData);
        setIsDisabled(true);
        // setFormErrors(validate(formValues));
        // const errors = validate(formValues);

        // if (Object.keys(errors).length === 0) {
        axios
            .post('http://localhost:8080/schedule/create', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {})
            .catch((error) => {
                console.log(error);
            });
        // setFormErrors({});
        // setFormvalues(initalValues);
        // }
    };

    return (
        <div className="container">
            <div className="">
                <div className="d-flex align-items-center">
                    <h5 className="text-uppercase">Div này để thông tin bác sĩ</h5>
                </div>
            </div>

            <div className="container">
                <div className="d-flex justify-content-center">
                    <div class="schedule-form">
                        <div>
                            <div>
                                <h2 class="text-center">PHIẾU ĐẶT LỊCH KHÁM</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-3">
                                <div class="row my-2">
                                    <div class="col-md-6" style={{ paddingRight: '15px' }}>
                                        <div class="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                class="form-control input"
                                                id="full-name"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="name"
                                                readOnly={true}
                                                value={patient.name}
                                                autocomplete="off"
                                            />
                                            <label for="full-name">
                                                Họ và tên
                                                <span class="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-6" style={{ paddingRight: '10px' }}>
                                        <div class="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                class="form-control input"
                                                id="date-of-birth"
                                                placeholder="Họ và tên"
                                                readOnly={true}
                                                style={{ paddingTop: '10px' }}
                                                name="phone"
                                                value={patient.phone}
                                                autocomplete="off"
                                            />

                                            <label for="date-of-birth">
                                                Số điện thoại
                                                <span class="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row my-2">
                                    <div class="col-md-6" style={{ paddingRight: '15px' }}>
                                        <div class="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                class="form-control input"
                                                id="email"
                                                placeholder="Email"
                                                style={{ paddingTop: '10px' }}
                                                name="name"
                                                readOnly={true}
                                                value={patient.email}
                                                autocomplete="off"
                                            />
                                            <label for="full-name">
                                                Email
                                                <span class="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-6" style={{ paddingRight: '10px' }}>
                                        <div class="form-floating textbox mb-4">
                                            <input
                                                type="date"
                                                class="form-control input"
                                                id="date-of-birth"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="birthday"
                                                readOnly={true}
                                                value={patient.birthday}
                                                autocomplete="off"
                                            />

                                            <label for="date-of-birth">
                                                Ngày sinh
                                                <span class="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row my-2">
                                    <div class="col-md-6" style={{ paddingRight: '15px' }}>
                                        <div class="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                class="form-control input"
                                                id="email"
                                                placeholder="Email"
                                                style={{ paddingTop: '10px' }}
                                                readOnly={true}
                                                name="name"
                                                // value={patient.email}
                                                autocomplete="off"
                                            />
                                            <label for="full-name">
                                                Thành phố
                                                <span class="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-6" style={{ paddingRight: '10px' }}>
                                        <div class="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                class="form-control input"
                                                id="date-of-birth"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="phone"
                                                readOnly={true}
                                                // value={patient.birthday}
                                                autocomplete="off"
                                            />
                                            <label for="date-of-birth">
                                                Tỉnh
                                                <span class="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row my-2">
                                    <div class="col-md-12" style={{ paddingRight: '15px' }} formGroupName="email">
                                        <div class="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                class="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="scheduleAddress"
                                                value={formData.scheduleAddress}
                                                onChange={handleInputChange}
                                                autocomplete="off"
                                            />
                                            <label for="email">
                                                Địa chỉ cụ thể
                                                <span class="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row my-2">
                                    <div class="col-md-12" style={{ paddingRight: '15px' }} formGroupName="email">
                                        <div class="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                class="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="note"
                                                value={formData.note}
                                                onChange={handleInputChange}
                                                autocomplete="off"
                                            />
                                            <label for="email">
                                                Ghi chú
                                                <span class="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group text-center mt-2">
                                    {/* <button type="submit" className="btn btn-success bg" onClick={handleSubmitBack}>
                                        Trở Về
                                    </button> */}
                                    <button disabled={isDisabled} type="submit" className="btn btn-success bg">
                                        ĐẶT LỊCH
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
