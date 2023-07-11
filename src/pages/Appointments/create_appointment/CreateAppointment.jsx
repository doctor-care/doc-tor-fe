import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { startOfWeek, addDays, addWeeks, format } from 'date-fns';
import './CreateAppointment.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateAppointment() {
    const [dayList, setDayList] = useState([]);
    const [existDayList, setExistDayList] = useState([]);
    const [selectedDayList, setSelectedDayList] = useState([]);
    const [userNameDoctor, setUserNameDoctor] = useState(localStorage.getItem('userName'));
    const [disabled, setDisabled] = useState(false);

    const [min, setMin] = useState(5);
    useEffect(() => {
        showDayOfWeek();
    }, []);

    useEffect(() => {
        getExistDateList();
    }, []);

    const getNextMonday = () => {
        const today = new Date(); // Ngày hiện tại
        const startOfNextWeek = addWeeks(startOfWeek(today), 1); // Ngày đầu tiên của tuần kế tiếp
        const nextMonday = addDays(startOfNextWeek, 1); // Ngày thứ 2 của tuần kế tiếp
        return format(nextMonday, 'yyyy-MM-dd'); // Định dạng ngày thành 'dd/MM/yyyy'
    };
    const showDayOfWeek = () => {
        const startDate = new Date(getNextMonday()); // Ngày bắt đầu
        const weekdays = [];

        // Tạo danh sách ngày làm việc từ thứ 2 đến chủ nhật
        for (let i = 0; i < 7; i++) {
            const currentDate = addDays(startDate, i);
            weekdays.push(format(currentDate, 'yyyy-MM-dd')); // Định dạng ngày theo 'EEEE' (Monday, Tuesday, ...)
            setDayList(weekdays);
        }
    };

    const handleChange = (weekday) => {
        const index = selectedDayList.indexOf(weekday);
        if (index === -1) {
            setSelectedDayList([...selectedDayList, weekday]);
            console.log('selectedDayList', selectedDayList);
        } else {
            const updatedSeats = [...selectedDayList];
            updatedSeats.splice(index, 1);
            setSelectedDayList(updatedSeats);
            console.log('selectedDayList', selectedDayList);
        }
    };

    const convertDay = (day) => {
        var ngay = new Date(day);

        // Lấy ngày, tháng, năm từ đối tượng Date
        var ngayChuan = ngay.getDate();
        var thangChuan = ngay.getMonth() + 1; // Tháng trong JavaScript được đếm từ 0
        var namChuan = ngay.getFullYear();

        // Định dạng lại thành "dd-MM-yyyy"
        var ngayDinhDang = ngayChuan.toString().padStart(2, '0');
        var thangDinhDang = thangChuan.toString().padStart(2, '0');
        var namDinhDang = namChuan.toString();

        var ngayDinhDangCuoi = ngayDinhDang + '-' + thangDinhDang + '-' + namDinhDang;
        return ngayDinhDangCuoi;
    };

    const convertDayInWeek = (day) => {
        var ngay = new Date(day);

        // Lấy thứ của ngày trong tuần
        var thu = ngay.getDay();

        // Chuyển đổi giá trị thứ thành chuỗi tương ứng
        var thuTrongTuan = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

        // Lấy tên của thứ trong tuần
        var tenThu = thuTrongTuan[thu];
        return tenThu;
    };

    const isSelected = (day) => selectedDayList.includes(day);

    const isExist = (day) => existDayList.includes(day);

    const getExistDateList = () => {
        try {
            axios
                .get('http://localhost:8080/doctor/username/' + userNameDoctor)
                .then((response) => {
                    axios
                        .get('http://localhost:8080/appointment/get-date?doctorId=' + response.data.idDoctor)
                        .then((response) => {
                            if (response.data.length > 0) {
                                console.log('response', response);
                                setExistDayList(response.data);
                                setMin(0);
                            }
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const createAppointment = () => {
        if (selectedDayList.length < min) {
            toast.error('TỐI THIỂU 5 NGÀY LÀM VIỆC TRONG 1 TUẦN');
        } else {
            axios
                .post(
                    'http://localhost:8080/appointment/create',
                    {
                        userNameDoctor: userNameDoctor,
                        dateList: selectedDayList,
                        statusapm: 0,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((response) => {
                    if (response.status === 201) {
                        setDisabled(true);
                        getExistDateList();
                        console.log('userNameDoctor:', userNameDoctor, 'dateList:', selectedDayList, 'statusapm:', 0);
                        toast.success('ĐĂNG KÝ THÀNH CÔNG');
                    } else {
                        toast.error('ĐĂNG KÝ THẤT BẠI');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center">
                    <h5 className="text-uppercase">Lịch làm việc tuần tiếp theo</h5>
                </div>
            </div>
            <div className="container d-flex justify-content-center">
                <div className="col-12 d-flex justify-content-between">
                    {dayList.map((weekday, index) => (
                        <div
                            key={index}
                            className={` date m-2 ${
                                isExist(dayList[index])
                                    ? 'selected'
                                    : isSelected(dayList[index])
                                    ? 'day-selected'
                                    : 'day-not-selected'
                            } `}
                        >
                            <div className="text-center text-uppercase fw-bold">
                                <span>{convertDayInWeek(weekday)}</span>
                            </div>
                            <div
                                title={isExist(weekday) ? 'ĐÃ ĐƯỢC ĐĂNG KÝ' : 'CÓ THỂ ĐĂNG KÝ'}
                                key={index}
                                className="d-flex justify-content-center align-items-center mw-115"
                            >
                                {!isExist(weekday) && (
                                    <input
                                        style={{ paddingRight: '5px' }}
                                        type="checkbox"
                                        onChange={() => handleChange(weekday)}
                                    />
                                )}
                                <span>{convertDay(weekday)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container d-flex justify-content-center">
                <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    disabled={selectedDayList.length === 0 || disabled === true}
                >
                    ĐĂNG KÝ LỊCH
                </button>
            </div>

            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white" id="staticBackdropLabel">
                                ĐĂNG KÝ
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h5>Xác nhận đăng ký lịch hẹn?</h5>
                                {/* <span>
                                    - Mã vé: <strong>{maVeDelete}</strong>
                                </span> */}
                                <br></br>
                                {/* <span>
                                    - Hành khách: <strong>{tenHanhKhachDelete}</strong>
                                </span> */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={createAppointment}
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
