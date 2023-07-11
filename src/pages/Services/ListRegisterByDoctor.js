import './ListRegister.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

function RegisterListForDoctor() {
    const [userName] = useState(localStorage.getItem('userName'));
    const [doctorId, setDoctorId] = useState('');
    const [statusscd, setStatusscd] = useState(0);
    const [registerList, setRegisterList] = useState([]);
    const [idForAction, setIdForAction] = useState();

    const showStatusCSD = (status) => {
        switch (status) {
            case 0:
                return 'Chưa xác nhận';
            case 1:
                return 'Đã xác nhận';
            case 2:
                return 'Đã hoàn tất';
            case 3:
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    useEffect(() => {
        getDoctorId();
        getListRegister(statusscd);
    }, [doctorId, statusscd]);


    const getDoctorId = () => {
        try {
            axios.get('http://localhost:8080/doctor/username/' + userName).then((response) => {
                setDoctorId(response.data.idDoctor);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getListRegister = (stt) => {
        try {
            axios.get(`http://localhost:8080/service/register-by-id-doctor?idDoctor=${doctorId}&status=${stt}`).then((response) => {
                setRegisterList(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const confirmRegister = () => {
        try {
            axios.get(`http://localhost:8080/service/set-status?id=${idForAction}&status=1`).then((response) => {
                setStatusscd(1);
                toast.success("XÁC NHẬN THÀNH CÔNG");
            });
        } catch (error) {
            console.log(error);
        }

    };
    const cancelRegister = () => {
        try {
            axios.get(`http://localhost:8080/service/set-status?id=${idForAction}&status=3`).then((response) => {
                setStatusscd(3);
                toast.warning("HỦY LỊCH THÀNH CÔNG");
            });
        } catch (error) {
            console.log(error);
        }
    };
    const completeRegister = () => {
        try {
            axios.get(`http://localhost:8080/service/set-status?id=${idForAction}&status=2`).then((response) => {
                setStatusscd(2);
                toast.success("HOÀN TẤT PHIẾU ĐĂNG KÝ");
                setDoctorId(response.data.idDoctor);
            });
        } catch (error) {
            console.log(error);
        }

    };

    const getClassCSSByStatusSCD = (status) => {
        switch (status) {
            case 0:
                return 'btn-warning';
            case 1:
                return 'btn-primary';
            case 2:
                return 'btn-success';
            case 3:
                return 'btn-danger';
            default:
                return 'btn-secondary';
        }
    };

    return (
        <div className="container schedule-container bg-body shadow mg-top-60">
            <div className="pt-5 pb-2">
                <div className="text-center pb-2">
                    <h1>DANH SÁCH LỊCH ĐĂNG KÍ DỊCH VỤ</h1>
                </div>

                <form className="row justify-content-end">
                    <div className="form-group col-md-2 d-flex justify-content-end align-items-center p-0">
                        <h5 className="fw-bold m-0">Trạng thái</h5>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-end align-items-center">
                        <select
                            onChange={(e) => {
                                setStatusscd(e.target.value);
                            }}
                            value={statusscd}
                            className="border border-info text-center"
                        >
                            <option value={0} selected={statusscd === 0}> Chưa xác nhận </option>
                            <option value={1} selected={statusscd === 1}> Đã xác nhận </option>
                            <option value={2} selected={statusscd === 2}> Đã hoàn tất </option>
                            <option value={3} selected={statusscd === 3}> Đã hủy </option>
                        </select>
                    </div>
                </form>

            </div>
            <div className="mh-300">
                <table className="table table-striped border text-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ngày đăng kí</th>
                            <th scope="col">Tên bệnh nhân</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Dịch vụ đăng kí</th>
                            <th scope="col">Giá dịch vụ</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registerList.map((item, index) => {
                            return (
                                <tr className="align-middle text-nowrap" key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.createTime}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                    <td>{item.doctorServiceMedical.serviceMedical.nameService}</td>
                                    <td>{item.doctorServiceMedical.serviceMedical.priceService} vnd</td>

                                    <td className="">
                                        <button
                                            className={`btn btn-sm fw-bold text-white ${getClassCSSByStatusSCD(
                                                item.status,
                                            )}`}
                                            disabled={true}
                                        >
                                            {showStatusCSD(item.status)}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-primary btn-sm dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Chọn
                                            </button>
                                            {item.status !== 3 && (<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                {item.status === 0 && (
                                                    <li>
                                                        <button
                                                            className="text-decoration-none dropdown-item"
                                                            onClick={() => setIdForAction(item.id)}
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#confirmRs"
                                                        >
                                                            XÁC NHẬN
                                                        </button>
                                                        <button
                                                            className="text-decoration-none dropdown-item"
                                                            onClick={() => setIdForAction(item.id)}
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#cancelRs"
                                                        >
                                                            HỦY
                                                        </button>
                                                    </li>
                                                )}
                                                {item.status === 1 && (
                                                    <li>
                                                        <button
                                                            className="text-decoration-none dropdown-item"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#completedRs"
                                                        >
                                                            ĐÃ XONG
                                                        </button>
                                                        <button
                                                            className="text-decoration-none dropdown-item"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#cancelRs"
                                                        >
                                                            HỦY
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>)}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {registerList.length === 0 && (
                    <div className="row justify-content-center">
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ minHeight: '300px' }}
                        >
                            <div className="text-center">
                                <h3 className="">
                                    <span>KHÔNG CÓ LỊCH ĐĂNG KÝ NÀO!</span>

                                </h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* modal confirm */}
            <div
                className="modal fade"
                id="confirmRs"
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
                                <h5>Bạn muốn xác nhận phiếu đăng ký này?</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={confirmRegister}
                                data-bs-dismiss="modal"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal cancel */}
            <div
                className="modal fade"
                id="cancelRs"
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
                                <h5>Bạn muốn hủy phiếu đăng ký này?</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={cancelRegister}
                                data-bs-dismiss="modal"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* modal complete */}
            <div
                className="modal fade"
                id="completedRs"
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
                                <h5>Xác nhận hoàn thành phiếu đăng ký này?</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={completeRegister}
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
export default RegisterListForDoctor;
