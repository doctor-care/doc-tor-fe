import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateHistoryMedical() {
    const navigate = useNavigate();
    const [userNameDoctor] = useState(localStorage.getItem('userName'));
    const [patient, setPatient] = useState({});
    const [valid, setValid] = useState({});
    const [scheduleAddress, setScheduleAddress] = useState();
    const { idScd } = useParams();

    const initalValues = {
        userNameDoctor: userNameDoctor,
        createDate: Moment().format('YYYY-MM-DD'),
        symptom: '',
        diagnosis: '',
        result: '',
    };
    const [formData, setFormData] = useState(initalValues);

    const checkForm = Yup.object().shape({
        userNameDoctor: Yup.string().required('Chưa có userNameDoctor!'),
        createDate: Yup.date().required('Chưa có createDate!'),
        symptom: Yup.string().required('Không được để trống!'),
        diagnosis: Yup.string().required('Không được để trống!'),
        result: Yup.string().required('Không được để trống!'),
    });

    useEffect(() => {
        getScheduleInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idScd]);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const createHistoryMedical = () => {
        checkForm
            .validate(formData, { abortEarly: false })
            .then(() => {
                axios
                    .post('http://localhost:8080/history-medical/create', formData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => {
                        if (response.data.idHM === undefined) {
                            toast.error('THÊM MỚI THẤT BẠI!');
                        } else {
                            axios
                                .post(`http://localhost:8080/schedule/completed/${idScd}`)
                                .then((schedule) => {
                                    if (schedule.data === 'FAIL') {
                                    } else {
                                        toast.success('THÊM MỚI BỆNH ÁN THÀNH CÔNG!');
                                        navigate('/prescription/create/' + response.data.idHM);
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((validationErrors) => {
                const errors = {};
                validationErrors.inner.forEach((error) => {
                    errors[error.path] = error.message;
                });
                setValid(errors);
                console.log('errors', errors);
            });
    };

    const getScheduleInfo = () => {
        axios
            .get('http://localhost:8080/schedule/id/' + idScd)
            .then((response) => {
                console.log('SCHEDULE', response);
                formData.scheduleId = response.data.idSCD;
                formData.patientId = response.data.patient.idPatient;

                setPatient(response.data.patient);
                setScheduleAddress(response.data.scheduleAddress);
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

                            <div className="mt-3">
                                <div className="row my-1">
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
                                                Tên người bệnh
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
                                <div className="row my-1">
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

                                <div className="row my-1">
                                    <div className="col-md-12" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating  mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="symptom"
                                                readOnly={true}
                                                value={scheduleAddress}
                                            />
                                            <label htmlFor="email">
                                                Địa chỉ khám
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-1">
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
                                                {valid.symptom && <span className="text-danger"> {valid.symptom}</span>}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-1">
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
                                                {valid.diagnosis && (
                                                    <span className="text-danger"> {valid.diagnosis}</span>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-1">
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
                                                {valid.result && <span className="text-danger"> {valid.result}</span>}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group text-center mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-secondary bg mr-2"
                                        onClick={() => {
                                            navigate(-1);
                                        }}
                                    >
                                        Trở Về
                                    </button>
                                    <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#createHM"
                                        className="btn btn-success bg"
                                    >
                                        THÊM MỚI
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="createHM"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-success">
                            <h5 className="modal-title text-white" id="staticBackdropLabel">
                                XÁC NHẬN
                            </h5>
                            <button
                                type="button"
                                className="btn-close text-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h5>Bạn muốn thêm bệnh án này?</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={createHistoryMedical}
                                data-bs-dismiss="modal"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
