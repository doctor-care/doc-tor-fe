import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
import ReactStars from 'react-stars';
import './BookingSchedule.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
export default function BookingSchedule() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [userName] = useState(localStorage.getItem('userName'));
    const [idAPM] = useState(queryParams.get('idAPM'));
    const [idDoctor] = useState(queryParams.get('idDoctor'));
    const [patient, setPatient] = useState({});
    const [isDisabled, setIsDisabled] = useState(false);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [doctor, setDoctor] = useState({});

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

    useEffect(() => {
        axios
            .get(`http://localhost:8080/doctor/${idDoctor}`)
            .then((resp) => {
                console.log('doctor', resp.data);
                setDoctor(resp.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useMemo(() => {
        axios.get('https://vapi.vnappmob.com/api/province/').then((resp) => {
            console.log('here is ', resp.data.results);
            setCity(resp.data.results);
        });

        // axios.get(`https://vapi.vnappmob.com/api/province/district/${patient.city}`).then((resp) => {
        //     setDistrict(resp.data.results);
        // });
    }, []);

    const getPatientInfo = () => {
        try {
            axios.get('http://localhost:8080/patient/username/' + userName).then((response) => {
                console.log('patient info', response.data);
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
            .then((response) => {
                if (response.data === null) {
                    toast.error('LỊCH HẸN ĐÃ ĐƯỢC ĐẶT');
                } else {
                    toast.success('ĐẶT LỊCH THÀNH CÔNG!');
                    navigate('/user/schedule-list');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // setFormErrors({});
        // setFormvalues(initalValues);
        // }
    };

    const handleChangeCity = (e) => {
        // setValue('city', e.target.value);
        // setCheckEnable({ city: e.target.value });
    };

    return (
        <div className="container">
            <div>
                <div className="col-12 d-flex ">
                    {/* <div className="col-3 bg-img-doctor d-flex justify-content-center align-items-center">
                        <img src={doctor.avatarUrl} alt={`Avatar of ${doctor.name}`} className="avatar-img shadow" />
                    </div> */}
                    <div className="d-flex ">
                        <div>
                            <div className="d-flex row">
                                <div className=" col-2 bg-img-doctor d-flex justify-content-center align-items-center">
                                    <img
                                        src={doctor.avatarUrl}
                                        alt={`Avatar of ${doctor.name}`}
                                        className="avatar-img shadow"
                                    />
                                </div>
                                <div className="col-10 d-flex  align-items-md-center">
                                    <div className="">
                                        <Link to={`/doctor-detail/${doctor.idDoctor}`}>
                                            <div className="d-flex text-primary">
                                                <h1>{doctor.name}</h1>
                                                <span>({doctor.degree})</span>
                                            </div>
                                        </Link>
                                        <h6>
                                            <span className="text-primary mr-1">
                                                <i className="fa-solid fa-house-medical-circle-check"></i>
                                            </span>
                                            <span>CHUYÊN KHOA:</span>
                                            <span> {doctor.specialist?.name}</span>
                                        </h6>
                                        <div>
                                            <ReactStars
                                                count={5}
                                                value={doctor.averageRate}
                                                size={24}
                                                color2={'#ffd700'}
                                                half={false}
                                            />
                                        </div>
                                        <div>
                                            <p>{doctor.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="schedule-form">
                        <div>
                            <div>
                                <h2 className="text-center">PHIẾU ĐẶT LỊCH KHÁM</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-3">
                                <div className="row my-2">
                                    <div className="col-md-6" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating textbox mb-4">
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
                                        <div className="form-floating textbox mb-4">
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
                                        <div className="form-floating textbox mb-4">
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
                                        <div className="form-floating textbox mb-4">
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
                                    <div className="col-md-12" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="scheduleAddress"
                                                value={formData.scheduleAddress}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="email">
                                                Địa chỉ khám cụ thể
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-2">
                                    <div className="col-md-12" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="note"
                                                value={formData.note}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="email">
                                                Ghi chú
                                                <span className="text-danger">*</span>
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
