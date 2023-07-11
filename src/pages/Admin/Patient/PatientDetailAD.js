import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Patient.css';

export default function PatientDetailAD() {
    const [idChoice, setIdChoice] = useState();
    const [prescriptionDetailList, setPrescriptionDetailList] = useState([]);

    //search doctor from attribute
    const { id } = useParams();
    const [patient, setPatient] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8080/patient/by-id-patient?id=${id}`)
            .then((resp) => {
                setPatient(resp.data);
                console.log('patient', patient);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        getPrescriptionList();
    }, [idChoice]);

    const getPrescriptionList = () => {
        axios.get(`http://localhost:8080/prescription/get-list/${idChoice}`).then((response) => {
            console.log('RESPONSE LIST prescription', response.data[0]);
            setPrescriptionDetailList(response.data);
        });
    };

    return (
        <div className="flex justify-content-center">
            <div className=" max-w-screen-xl" style={{ marginTop: '95px ' }}>
                <div className="col-12 d-flex shadow">
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

                <div className="mt-4">
                    <div className="text-left">
                        <h3>LỊCH SỬ KHÁM BỆNH</h3>
                    </div>
                    <div className="mh-300 mt-1">
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
                                                        className="btn btn-primary btn-sm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#showPrescription"
                                                        onClick={() => {
                                                            setIdChoice(item.idHM);
                                                            console.log(item.idHM);
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

                <div
                    className="modal fade"
                    id="showPrescription"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h5 className="modal-title text-white " id="staticBackdropLabel">
                                    THÔNG TIN ĐƠN THUỐC
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close text-white"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                {prescriptionDetailList.length > 0 && (
                                    <table className="table table-striped border text-center">
                                        <thead className="">
                                            <tr>
                                                <th>TÊN THUỐC</th>
                                                {/* <td>ĐƠN GIÁ</td> */}
                                                <th>SỐ LƯỢNG</th>
                                                {/* <td>THÀNH TIỀN</td> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prescriptionDetailList.map((item, index) => {
                                                return (
                                                    <tr className="align-middle text-nowrap" key={index}>
                                                        <td>{item.drugName}</td>
                                                        {/* <td>{item.drugPrice}</td> */}
                                                        <td>{item.quantity}</td>
                                                        {/* <td>{item.drugPrice * item.quantity}</td> */}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                                {prescriptionDetailList.length === 0 && <div>BỆNH ÁN NÀY KHÔNG CÓ ĐƠN THUỐC!</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
