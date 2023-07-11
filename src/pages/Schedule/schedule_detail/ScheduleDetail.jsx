import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ScheduleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userName] = useState(localStorage.getItem('userName'));
    const [schedule, setSchedule] = useState({});
    const [patient, setPatient] = useState({});
    const [appointment, setAppointment] = useState({});
    const [shifts, setShifts] = useState({});

    useEffect(() => {
        getScheduleInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName]);

    const handleConfirm = () => {
        axios
            .post(`http://localhost:8080/schedule/confirm/${schedule.idSCD}`)
            .then((response) => {
                console.log('update response', response);
                if (response.data === 'FAIL') {
                    toast.error('XÁC NHẬN KHÔNG THÀNH CÔNG');
                } else {
                    toast.success('XÁC NHẬN THÀNH CÔNG');
                    navigate('/doctor/schedule-list?status=1');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCancle = () => {
        axios
            .post(`http://localhost:8080/schedule/cancel/${schedule.idSCD}`)
            .then((response) => {
                console.log('cancel response', response);
                if (response.data === 'FAIL') {
                    toast.error('HỦY KHÔNG THÀNH CÔNG');
                } else {
                    toast.success('HỦY LỊCH HẸN THÀNH CÔNG');
                    navigate('/doctor/schedule-list?status=1');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getAge = (birthday) => {
        var date = new Date(birthday);
        var currentDate = new Date();
        var age = currentDate.getFullYear() - date.getFullYear();
        if (
            currentDate.getMonth() < date.getMonth() ||
            (currentDate.getMonth() === date.getMonth() && currentDate.getDate() < date.getDate())
        ) {
            age--;
        }
        return age;
    };

    const getScheduleInfo = () => {
        console.log('getScheduleInfo');
        try {
            axios.get('http://localhost:8080/schedule/id/' + id).then((response) => {
                console.log('schedule response', response.data);
                setSchedule(response.data);
                setPatient(response.data.patient);
                setAppointment(response.data.appointment);
                setShifts(response.data.appointment.shifts);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const showStatusCSD = (status) => {
        switch (status) {
            case 0:
                return 'Chưa xác nhận';
            case 1:
                return 'Đã xác nhận';
            case 4:
                return 'Đã hoàn tất';
            case 5:
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const getClassCSSByStatusSCD = (status) => {
        switch (status) {
            case 0:
                return 'btn-warning';
            case 1:
                return 'btn-primary';
            case 4:
                return 'btn-success';
            case 5:
                return 'btn-danger';
            default:
                return 'btn-secondary';
        }
    };

    return (
        <div className="container">
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="schedule-form mt-5">
                        <div>
                            <div className="row">
                                <div className="col-3">
                                    <button
                                        type="submit"
                                        className="btn btn-secondary btn-sm shadow"
                                        onClick={() => {
                                            navigate(-1);
                                        }}
                                    >
                                        <i class="fa-solid fa-backward"></i>
                                        <span> Trở Về</span>
                                    </button>
                                </div>
                                <div className="col-6">
                                    <h2 className="text-center">CHI TIẾT LỊCH KHÁM</h2>
                                </div>
                                <div className="col-3 text-end">
                                    <button
                                        className={`btn btn-sm fw-bold text-white ${getClassCSSByStatusSCD(
                                            schedule.statusSCD,
                                        )}`}
                                    >
                                        {showStatusCSD(schedule.statusSCD)}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3">
                                <div className="row my-1">
                                    <div className="col-md-6" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="full-name"
                                                placeholder="Tên bệnh nhân"
                                                style={{ paddingTop: '10px' }}
                                                name="name"
                                                readOnly={true}
                                                value={patient.name}
                                            />
                                            <label htmlFor="full-name">
                                                Tên bệnh nhân
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
                                <div className="row my-1">
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
                                                value={patient.sex}
                                            />
                                            <label htmlFor="full-name">
                                                Giới tính
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
                                                style={{ paddingTop: '10px' }}
                                                name="birthday"
                                                readOnly={true}
                                                value={getAge(patient.birthday)}
                                            />

                                            <label htmlFor="date-of-birth">
                                                Tuổi
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-1">
                                    <div className="col-md-6" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating textbox mb-4">
                                            <input
                                                type="date"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Email"
                                                style={{ paddingTop: '10px' }}
                                                name="name"
                                                readOnly={true}
                                                value={appointment.date}
                                            />
                                            <label htmlFor="full-name">
                                                Ngày khám
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
                                                style={{ paddingTop: '10px' }}
                                                name="birthday"
                                                readOnly={true}
                                                value={shifts.shiftsName}
                                            />

                                            <label htmlFor="date-of-birth">
                                                Ca khám
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-1">
                                    <div className="col-md-12" style={{ paddingRight: '15px' }}>
                                        <div className="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="scheduleAddress"
                                                value={schedule.scheduleAddress}
                                                readOnly={true}
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
                                        <div className="form-floating textbox mb-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                id="email"
                                                placeholder="Họ và tên"
                                                style={{ paddingTop: '10px' }}
                                                name="note"
                                                value={schedule.note}
                                                readOnly={true}
                                            />
                                            <label htmlFor="email">
                                                Ghi chú
                                                <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-2 d-flex justify-content-center">
                                    {schedule.statusSCD === 0 && (
                                        <button
                                            className="btn btn-warning mr-2 shadow"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cancelSchedule"
                                        >
                                            Hủy lịch
                                        </button>
                                    )}
                                    {schedule.statusSCD === 0 && (
                                        <button
                                            className="btn btn-success shadow"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                        >
                                            Xác nhận
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <h5>Bạn muốn xác nhận lịch hẹn này?</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={handleConfirm}
                                data-bs-dismiss="modal"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="cancelSchedule"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger">
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
                                <h5>Bạn muốn hủy lịch khám này?</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={handleCancle}
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
