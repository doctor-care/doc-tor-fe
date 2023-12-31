import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AppointmentFromDoctor.css';
import ReactStars from 'react-stars';
import WinChat from '../../Chat/WinChat';

export default function AppointmentFromDoctor() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    //search doctor from attribute
    const [doctorId] = useState(queryParams.get('doctorId'));
    const [doctor, setDoctor] = useState({});
    const [date, setDate] = useState([]);
    const [dateSearch, setDateSearch] = useState('');
    const [appointmentList, setAppointmentList] = useState([]);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState('');
    const [review, setReview] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('role'));

    const handleInputChange = (event) => {
        setDateSearch(event.target.value);
    };

    const convertChoiceDate = (choiceDate) => {
        var date = new Date(choiceDate);
        var day = date.getDate();
        var month = date.getMonth() + 1; // Vì tháng tính từ 0 đến 11, nên cần +1
        var year = date.getFullYear();
        var dayOfWeek = date.getDay();
        var dayText =
            ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][dayOfWeek] +
            ' - ' +
            day +
            '/' +
            month +
            '/' +
            year;
        return dayText;
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
                    console.log('setAppointmentList', response.data);
                    setAppointmentList(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getAppointmentDateList = () => {
        try {
            axios.get('http://localhost:8080/appointment/get-date?doctorId=' + doctorId).then((response) => {
                console.log(response.data);
                setDate(response.data);
                getAppointmentList(response.data[0]);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChoice = (idApp, idDoc) => {
        if ('ROLE_PATIENT' === role) {
            navigate(`/booking-schedule?idAPM=${idApp}&idDoctor=${idDoc}`);
        } else {
            const result = window.confirm('Bạn phải đăng nhập để tiếp tục. Bấm OK để đăng nhập.');
            if (result) {
                navigate(`/login`);
            }
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/doctor/${doctorId}`)
            .then((resp) => {
                setDoctor(resp.data);
                console.log('doctor', doctor);
            })
            .catch((error) => console.log(error));
        axios
            .get(`http://localhost:8080/doctor/review?id=${doctorId}`)
            .then((resp) => {
                setReview(resp.data);
                console.log('review', review);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="containerDT">
            <div>
                <div className="col-12 d-flex ">
                    <div className="col-3 bg-img-doctor d-flex justify-content-center align-items-center">
                        <img src={doctor.avatarUrl} alt={`Avatar of ${doctor.name}`} className="avatar-img shadow" />
                    </div>
                    <div className="col-9 d-flex ">
                        <div>
                            <div className="d-flex text-primary">
                                <h1>{doctor.name}</h1>
                                <span>({doctor.degree})</span>
                            </div>

                            <h6>
                                <span className="text-primary mr-1">
                                    <i className="fa-solid fa-house-medical-circle-check"></i>
                                </span>
                                <span>CHUYÊN KHOA:</span>
                                <span> {doctor.specialist?.name}</span>
                            </h6>
                            {/* <WinChat
                            isOpen={isOpen}
                            onClose={handleCloseModal}
                            user={user}
                            doctor={doctor.users?.userName}
                        /> */}
                            <div>
                                <ReactStars
                                    count={5}
                                    value={doctor.averageRate}
                                    size={24}
                                    color2={'#ffd700'}
                                    half={false}
                                />
                            </div>
                            <p>Số điện thoại: {doctor.phone}</p>
                            <p>Email: {doctor.email}</p>
                            <p>Địa chỉ: {doctor.address?.address}</p>
                            <p>{doctor.description}</p>
                            <div className="city">
                                {city.map(
                                    (item) =>
                                        item.province_id === doctor.address.city.toString() && (
                                            <p className="font-weight-bold">{item.province_name}</p>
                                        ),
                                )}
                            </div>

                            <div className="district">
                                {district.map(
                                    (item) =>
                                        item.district_id === doctor.address.district.toString() && (
                                            <p className="font-weight-bold">{item.district_name}</p>
                                        ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="col-12 d-flex row justify-content-between mt-3">
                    <div className="col-6 text-center">
                        <h5>VUI LÒNG CHỌN LỊCH KHÁM THEO KHUNG GIỜ</h5>
                    </div>
                    <div className="col-6 row d-flex justify-content-end">
                        <div className="col-4 text-uppercase fw-bold d-flex justify-content-end">
                            <span>ngày khám</span>
                        </div>
                        <div className="col-5">
                            <select name="date" id="date" onChange={handleInputChange} className="border border-2">
                                {date.length === 0 && <option value="">-- Chọn ngày --</option>}
                                {date.map((date) => (
                                    <option key={date} value={date}>
                                        {convertChoiceDate(date)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 row d-flex justify-content-around">
                        {appointmentList.map((app) => (
                            <div
                                key={app.idAPM}
                                title={
                                    app.statusAPM === 2
                                        ? 'LỊCH ĐÃ ĐƯỢC ĐẶT'
                                        : app.statusAPM === 1
                                        ? 'ĐANG CHỜ XÁC NHẬN'
                                        : 'CÓ THỂ CHỌN'
                                }
                                className={`fw-bold col-2 text-center m-1 shift ${
                                    app.statusAPM === 2 ? 'confirmed' : app.statusAPM === 1 ? 'booking' : 'free'
                                } `}
                                onClick={app.statusAPM > 0 ? null : () => handleChoice(app.idAPM, app.doctor.idDoctor)}
                            >
                                <span>{app.shifts.shiftsName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="">
            <h2 className="mt-4">Bình luận</h2>
                <div className="">
                    {review.length > 0 &&
                        review.map((item, index) => (
                            <div className=" shadow-sm rounded-1" key={index}>
                                <div className="member d-flex align-items-start">
                                    <div className="member-info w-100 row">
                                        <div className="col-1  ">
                                            <img src={item.schedule.patient.avatarUrl} />
                                        </div>
                                        <div className="col-11  ">
                                            <div className="flex justify-content-between">
                                                <div className="flex ">
                                                    <h5
                                                        className="mr-2"
                                                        onClick={() => {
                                                            navigate(`/doctor-detail/${item.idDoctor}`);
                                                        }}
                                                    >
                                                        {item.schedule.patient.name}
                                                    </h5>
                                                    <span>{item.dateCreate}</span>
                                                </div>

                                                <div className="flex justify-content-center align-content-center">
                                                    <ReactStars
                                                        count={5}
                                                        value={item.rate}
                                                        size={24}
                                                        color2={'#ffd700'}
                                                        half={false}
                                                    />
                                                </div>
                                            </div>
                                            <p className="mx-2 ">{item.reviewString}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
