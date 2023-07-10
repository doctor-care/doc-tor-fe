import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Patient.css'

export default function PatientDetailAD() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    //search doctor from attribute
    const { id } = useParams();
    const [patient, setPatient] = useState({});

    const [role, setRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        axios
            .get(`http://localhost:8080/patient/by-id-patient?id=${id}`)
            .then((resp) => {
                setPatient(resp.data);
                console.log('patient', patient);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="containerDT">
            <div>
                <div className="col-12 d-flex ">
                    <div className="col-3 bg-img-doctor d-flex justify-content-center align-items-center">
                        <img src={patient.avatarUrl} alt={`Avatar of ${patient.name}`} className="avatar-img shadow" />
                    </div>
                    <div className="col-9 d-flex ">
                        <div>
                            <div className="d-flex text-primary">
                                <h1>{patient.name}</h1>
                            </div>

                            {/* <WinChat
                            isOpen={isOpen}
                            onClose={handleCloseModal}
                            user={user}
                            doctor={doctor.users?.userName}
                        /> */}

                            <p>Số điện thoại: {patient.phone}</p>
                            <p>Email: {patient.email}</p>
                            <p>Địa chỉ: {patient.address?.address}</p>
                            <p>Lịch sử bệnh án:{patient.healthHistory}</p>
                            <p>Nhóm máu: {patient.bloodType}</p>
                            {/* <div className="city">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="col-8 d-flex row justify-content-between mt-2 listLSKB">
                    <div className="text-left">
                        <h3>LỊCH SỬ KHÁM BỆNH</h3>
                    </div>
                    <div className="mh-300 ">
                        <table className="table table-striped border text-nowrap">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ngày Khám</th>
                                    <th scope="col">Khoa khám</th>
                                    <th scope="col">Triệu chứng</th>
                                    <th scope="col">Chuẩn đoán</th>
                                    <th scope="col">Giải pháp</th>
                                    <th scope="col">Đơn thuốc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patient.historyMedicals &&
                                    patient.historyMedicals.map((item, index) => {
                                        return (
                                            <tr className="align-middle text-nowrap" key={index}>
                                                <th> {index + 1}</th>
                                                <td>{item.createDate}</td>
                                                <td className="address-cell">Tai mũi họng</td>
                                                <td>{item.symptom}</td>
                                                <td>{item.diagnosis}</td>
                                                <td className="address-cell">{item.result}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#showPrescription"
                                                        onClick={() => {
                                                            navigate('');
                                                        }}
                                                    >
                                                        Xem đơn thuốc
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>

                        {patient.historyMedicals && patient.historyMedicals.length === 0 && (
                            <div className="row justify-content-center">
                                <div className="col-6 justify-content-center" style={{ minHeight: '328px' }}>
                                    <img
                                        src="https://i.giphy.com/media/HTSsuRrErs54g1Tqr5/giphy.webp"
                                        alt="Flight"
                                        style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                                    />
                                    <div className="text-center">
                                        <h5 className="">KHÔNG TÌM THẤY LỊCH HẸN NÀO!</h5>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
