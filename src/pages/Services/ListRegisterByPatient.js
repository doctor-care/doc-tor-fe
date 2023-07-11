import './ListRegister.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// import { toast } from 'react-toastify';

function RegisterListForPatient() {
    const [userName] = useState(localStorage.getItem('userName'));
    const [patientId, setPatientId] = useState('');
    const [statusscd, setStatusscd] = useState(0);
    const [registerList, setRegisterList] = useState([]);

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
        getPatientId();
        getListRegister(statusscd);
    }, [patientId, statusscd]);

    const getPatientId = () => {
        try {
            axios.get(`http://localhost:8080/patient/username?userName=${userName}`).then((response) => {
                setPatientId(response.data.idPatient);
            });
        } catch (error) {
            console.log(error);
        }
    };
    const getListRegister = (stt) => {
        try {
            axios
                .get(`http://localhost:8080/service/register-by-id-patient?idPatient=${patientId}&status=${stt}`)
                .then((response) => {
                    setRegisterList(response.data);
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
                        <h5 className="fw-bold m-0">Tìm Kiếm Theo</h5>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-end align-items-center">
                        <select
                            name="diemDi"
                            id="diemDi"
                            onChange={(e) => {
                                setStatusscd(e.target.value);
                            }}
                            value={statusscd}
                            className="border border-info text-center"
                        >
                            <option value={0}> Chưa xác nhận </option>
                            <option value={1}> Đã xác nhận </option>
                            <option value={2}> Đã hoàn tất </option>
                            <option value={3}> Đã hủy </option>
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
                            <th scope="col">Tên bác sĩ</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Dịch vụ đăng kí</th>
                            <th scope="col">Giá dịch vụ</th>
                            <th scope="col">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registerList.map((item, index) => {
                            return (
                                <tr className="align-middle text-nowrap" key={item.idScd}>
                                    <td>{index + 1}</td>
                                    <td>{item.createTime}</td>
                                    <td>{item.doctorServiceMedical.doctor.name}</td>

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
                                    <span>KHÔNG CÓ LỊCH HẸN NÀO!</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default RegisterListForPatient;
