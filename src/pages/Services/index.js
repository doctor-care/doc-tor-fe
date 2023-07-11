import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FormRegister.css';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';

export default function Service() {
    const { id } = useParams();
    console.log('id', id);
    const user = localStorage.getItem('userName');
    const role = localStorage.getItem('role');
    const [listDoctorService, setListDoctorService] = useState([]);
    const [service, setService] = useState('');
    const [nameDoctor, setNameDoctor] = useState('');
    const [form, setForm] = useState({
        idPatient: '',
        idDoctorServiceMedical: '',
        phone: '',
        fullname: '',
        address: '',
    });
    const [data, setData] = useState({});
    const handleInputChange = (event) => {
        setForm({ ...form, address: event.target.value });
    };
    useEffect(() => {
        const username = localStorage.getItem('userName');
        axios
            .get(`http://localhost:8080/patient/username/${username}`)
            .then((response) => {
                const data = response.data;
                setData(data);
                console.log('data', data);
                setForm({
                    ...form,
                    idPatient: data.idPatient,
                    phone: data.phone,
                    fullname: data.name,
                    address: data.address,
                });
            })
            .catch((error) => console.error);
    }, []);

    const confirm = (id, name) => {
        setNameDoctor(name);
        setForm({
            ...form,
            idDoctorServiceMedical: id,
        });
    };
    const handleConfirm = () => {
        axios
            .post(`http://localhost:8080/service/create-register-service`, form, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                const data = response.data;
                toast.success('Đăng kí thành công');
                console.log('data', data);
            })
            .catch((error) => console.error);
        console.log('form', form);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/service/list-doctor-by-id-service?idService=${id}`)
            .then((response) => {
                const data = response.data;
                setListDoctorService(data);
            })
            .catch((error) => console.error);

        axios
            .get(`http://localhost:8080/service/service-by-id-service?idService=${id}`)
            .then((response) => {
                const data = response.data;
                setService(data);
            })
            .catch((error) => console.error);
    }, [id]);

    return (
        <section id="services" className="services" style={{ marginTop: '100px' }}>
            <div className="container">
                <div className="section-title">
                    <h2>{service.nameService}</h2>
                    <h3>{service.priceService} vnd</h3>
                    <p>{service.description}</p>
                </div>

                <div className="row">
                    {listDoctorService.map((doctorService) => (
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="member d-flex align-items-start">
                                <div className="pic">
                                    <img src={doctorService.doctor.avatarUrl} className="" alt=""></img>
                                </div>
                                <div className="member-info">
                                    <h4>{doctorService.doctor.name}</h4>
                                    <h5>{doctorService.doctor.specialist?.name}</h5>
                                    <div>{doctorService.doctor.birthday}</div>

                                    <span>
                                        <ReactStars
                                            count={5}
                                            value={doctorService.doctor.averageRate}
                                            size={24}
                                            color2={'#ffd700'}
                                            half={false}
                                        />
                                    </span>
                                    <p>{doctorService.doctor.description}</p>
                                    {role === 'ROLE_PATIENT' && (
                                        <div>
                                            <button
                                                className="btn btn-success"
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                onClick={() => confirm(doctorService.id, doctorService.doctor.name)}
                                            >
                                                Xác nhận lịch hẹn
                                            </button>
                                        </div>
                                    )}
                                    <div className="social">
                                        <a href="">
                                            <i class="ri-twitter-fill"></i>
                                        </a>
                                        <a href="">
                                            <i class="ri-facebook-fill"></i>
                                        </a>
                                        <a href="">
                                            <i class="ri-instagram-fill"></i>
                                        </a>
                                        <a href="">
                                            {' '}
                                            <i class="ri-linkedin-box-fill"></i>{' '}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
                                    <label>Bác sĩ:</label>
                                    <input
                                        type="text"
                                        className=" border w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
                                        value={nameDoctor}
                                        readOnly
                                    />
                                    <label>Dịch vụ:</label>
                                    <input
                                        type="text"
                                        className=" border w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
                                        value={service.nameService}
                                        readOnly
                                    />
                                    <h5>Thông tin người đăng kí: </h5>
                                    <label>Họ tên</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className=" border w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
                                        placeholder="Enter full name"
                                        value={data.name}
                                        readOnly
                                    />
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className=" border w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
                                        placeholder="Nhập số điện thoại"
                                        value={data.phone}
                                    />
                                    <label>Địa chỉ</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="border w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
                                        placeholder="Nhập địa chỉ"
                                        value={data.address}
                                    />
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
            </div>
        </section>
    );
}
