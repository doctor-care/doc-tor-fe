import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './BookingSchedule.css';

export default function CreateHistoryMedical() {
    const navigate = useNavigate();
    const [userNameDoctor] = useState(localStorage.getItem('userName'));
    const [userNamePatient, setUserNamePatient] = useState('');
    const [patient, setPatient] = useState({});
    const [isDisabled, setIsDisabled] = useState(false);
    const { idScd } = useParams();

    // console.log('idScd', idScd);
    const initalValues = {
        userNameDoctor: userNameDoctor,
        createDate: Moment().format('YYYY-MM-DD'),
        symptom: '',
        diagnosis: '',
        result: '',
    };
    const [formData, setFormData] = useState(initalValues);

    useEffect(() => {
        getScheduleInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idScd]);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formValues', formData);
        setIsDisabled(true);
        // setFormErrors(validate(formValues));
        // const errors = validate(formValues);

        // if (Object.keys(errors).length === 0) {
        axios
            .post('http://localhost:8080/history-medical/create', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.data.idHM === undefined) {
                    toast.error('THÊM MỚI THẤT BẠI');
                } else {
                    toast.success('THÊM MỚI THÀNH CÔNG');
                    navigate('/prescription/create/' + response.data.idHM);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // setFormErrors({});
        // setFormvalues(initalValues);
        // }
    };

    const getScheduleInfo = () => {
        axios
            .get('http://localhost:8080/schedule/id/' + idScd)
            .then((response) => {
                console.log('getScheduleInfo', response);

                formData.patientId = response.data.patient.idPatient;
                setPatient(response.data.patient);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="container">
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="schedule-form">
                        <div>
                            <div>
                                <h2 className="text-center">THÊM MỚI BỆNH ÁN</h2>
                            </div>
                            {/* <form className="d-flex justify-content-center" onSubmit={showPatientInfo}>
                                <div className="form-floating mb-4">
                                    <input
                                        type="text"
                                        className="border"
                                        id="full-name"
                                        placeholder="Nhập tài khoản bệnh nhân"
                                        style={{ paddingTop: '10px' }}
                                        name="name"
                                        onChange={(e) => {
                                            setUserNamePatient(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="form-floating  mb-4">
                                    <button type="submit" className="btn btn-primary">
                                        Tìm
                                    </button>
                                </div>
                            </form> */}

                            <form onSubmit={handleSubmit} className="mt-3">
                                <div className="row my-2">
                                    <div className="col-md-6" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="full-name"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="name"
                                                readOnly={true}
                                                value={patient.name}
                                            />
                                            <label htmlFor="full-name">
                                                Họ và tên
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6" style={{ paddingRight: '10px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="date-of-birth"
                                                placeholder="Họ và tên"
                                                readOnly={true}
                                                style={{ paddingTop: '10px' }}
                                                name="phone"
                                                value={patient.phone}
                                            />

                                            <label htmlFor="date-of-birth">
                                                Số điện thoại
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-md-6" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Email"
                                                style={{ paddingTop: '10px' }}
                                                name="name"
                                                readOnly={true}
                                                value={patient.email}
                                            />
                                            <label htmlFor="full-name">
                                                Email
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6" style={{ paddingRight: '10px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="date"
                                                className="form-control input"
                                                id="date-of-birth"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="birthday"
                                                readOnly={true}
                                                value={patient.birthday}
                                            />

                                            <label htmlFor="date-of-birth">
                                                Ngày sinh
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-md-6" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Email"
                                                style={{ paddingTop: '10px' }}
                                                readOnly={true}
                                                name="name"
                                                // value={patient.email}
                                            />
                                            <label htmlFor="full-name">
                                                Thành phố
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6" style={{ paddingRight: '10px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="date-of-birth"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="phone"
                                                readOnly={true}
                                                // value={patient.birthday}
                                            />
                                            <label htmlFor="date-of-birth">
                                                Tỉnh
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-md-12" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="symptom"
                                                value={formData.symptom}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="email">
                                                Triệu chứng
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-2">
                                    <div className="col-md-12" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="diagnosis"
                                                value={formData.diagnosis}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="email">
                                                Chuẩn đoán
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-md-12" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="result"
                                                value={formData.result}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="email">
                                                Kết quả
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group text-center mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-success bg"
                                        onClick={() => {
                                            navigate('/');
                                        }}
                                    >
                                        Trở Về
                                    </button>
                                    <button disabled={isDisabled} type="submit" className="btn btn-success bg">
                                        THÊM MỚI
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
