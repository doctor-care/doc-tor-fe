import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './styles.css';

function Header() {
    const [listService, setListService] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [selected, setSelected] = useState('0');
    // useEffect(() => {
    //     getRole();
    // }, []);

    const [userName, setUserName] = useState(
        localStorage.getItem('accessToken') ? jwtDecode(localStorage.getItem('accessToken')).sub : '',
    );
    useEffect(() => {
        axios
            .get(`http://localhost:8080/service/list-service`)
            .then((response) => {
                const data = response.data;
                setListService(data);
            })
            .catch((error) => console.error);
    }, []);


    console.log('role', role);

    return (
        <div>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center p-2">
                    <h1 className="logo me-auto">
                        <div className="flex justify-center">
                            <Link to={'/'}>
                                <img src="/logo.png" alt="logo" className="w-32 h-12 object-cover" />
                            </Link>
                        </div>
                    </h1>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li
                                onClick={() => {
                                    setSelected('0');
                                }}
                            >
                                <Link
                                    as={Link}
                                    to="/"
                                    className={`nav-link scrollto ${selected === '0' ? 'active' : ''}`}
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            {role !== 'ROLE_DOCTOR' && (
                                <>
                                    <li
                                        onClick={() => {
                                            setSelected('1');
                                        }}
                                    >
                                        <Link
                                            as={Link}
                                            to="/doctors"
                                            className={`nav-link scrollto ${selected === '1' ? 'active' : ''}`}
                                        >
                                            <span>Danh sách bác sĩ</span>
                                        </Link>
                                    </li>

                                    <li className="dropdown">
                                        <Link className={`nav-link scrollto ${selected === '2' ? 'active' : ''}`}>
                                            <span>Dịch vụ y tế</span> <i className="bi bi-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li className="dropdown">
                                                <Link>
                                                    <span>Dịch vụ Đông y</span> <i className="bi bi-chevron-right"></i>
                                                </Link>
                                                <ul>
                                                    {listService.map(
                                                        (service) =>
                                                            service.typeService === 1 && (
                                                                <li
                                                                    onClick={() => {
                                                                        setSelected('2');
                                                                    }}
                                                                >
                                                                    <Link
                                                                        key={service.idService}
                                                                        as={Link}
                                                                        to={`/service/${service.idService}`}
                                                                    >
                                                                        <span>{service.nameService}</span>
                                                                    </Link>
                                                                </li>
                                                            ),
                                                    )}
                                                </ul>
                                            </li>
                                            <li className="dropdown">
                                                <Link>
                                                    <span>Dịch vụ Tây y</span> <i className="bi bi-chevron-right"></i>
                                                </Link>
                                                <ul>
                                                    {listService.map(
                                                        (service) =>
                                                            service.typeService === 2 && (
                                                                <li
                                                                    onClick={() => {
                                                                        setSelected('2');
                                                                    }}
                                                                >
                                                                    <Link
                                                                        key={service.idService}
                                                                        to={`/service/${service.idService}`}
                                                                    >
                                                                        <span>{service.nameService}</span>
                                                                    </Link>
                                                                </li>
                                                            ),
                                                    )}
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            {role === 'ROLE_DOCTOR' && (
                                <>
                                    <li
                                        onClick={() => {
                                            setSelected('1');
                                        }}
                                    >
                                        <Link
                                            as={Link}
                                            to="/doctors"
                                            className={`nav-link scrollto ${selected === '1' ? 'active' : ''}`}
                                        >
                                            Danh sách bác sĩ
                                        </Link>
                                    </li>
                                    <li className="dropdown">
                                        <Link className={`text-decoration-none ${selected === '2' ? 'active' : ''}`}>
                                            <span>Lịch Hẹn</span> <i className="bi bi-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li
                                                onClick={() => {
                                                    setSelected('3');
                                                }}
                                            >
                                                <Link
                                                    as={Link}
                                                    to="/doctor/schedule-list"
                                                    className="nav-link scrollto"
                                                >
                                                    Danh sách lịch hẹn
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() => {
                                                    setSelected('3');
                                                }}
                                            >
                                                <Link as={Link} to="/get-register-doctor" className="nav-link scrollto">
                                                    Danh sách lịch đăng kí dịch vụ
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown" onClick={()=>{setSelected('4')}}>
                                        <Link as={Link} to="/appointment/create" className={`nav-link scrollto ${selected === '4' ? 'active' : ''}`}>
                                            Thêm lịch làm việc
                                        </Link>
                                    </li>
                                    <li>
                                        <Link as={Link} to="/chat" className="nav-link scrollto">
                                            <button className="btn btn-warning">Nhắn tin</button>
                                        </Link>
                                    </li>
                                </>
                            )}

                            {role === 'ROLE_PATIENT' && (
                                <>
                                    <li onClick={()=>{setSelected('5')}}>
                                        <Link as={Link} to="/history-medical-list" className={`nav-link scrollto ${selected === '5' ? 'active' : ''}`}>
                                            Lịch sử khám
                                        </Link>
                                    </li>
                                    <li className="dropdown">
                                        <Link className={`text-decoration-none ${selected === '6' ? 'active' : ''}`}>
                                            <span>Lịch Hẹn</span> <i className="bi bi-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li onClick={()=>{setSelected('6')}}>
                                                <Link as={Link} to="/specialist" className="nav-link scrollto">
                                                    Đặt lịch hẹn
                                                </Link>
                                            </li>
                                            <li onClick={()=>{setSelected('6')}}>
                                                <Link as={Link} to="/user/schedule-list" className="nav-link scrollto">
                                                    Danh sách lịch hẹn
                                                </Link>
                                            </li>
                                            <li onClick={()=>{setSelected('6')}}>
                                                <Link
                                                    as={Link}
                                                    to="/get-register-patient"
                                                    className="nav-link scrollto"
                                                >
                                                    Danh sách lịch đăng kí dịch vụ
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link as={Link} to="/chat" className="nav-link scrollto">
                                            <button className="btn btn-warning">Nhắn tin</button>
                                        </Link>
                                    </li>
                                </>
                            )}

                            {/* <li className="dropdown">
                                <Link>
                                    <span>Bác sĩ</span> <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li>
                                        <Link as={Link} to="/doctors" className="nav-link scrollto">
                                            Danh sách bác sĩ
                                        </Link>
                                        <Link as={Link} to="/createDoc" className="nav-link scrollto">
                                            Thêm bác sĩ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link as={Link} to="/editDoc" className="nav-link scrollto">
                                            Cập nhật thông tin của bác sĩ
                                        </Link>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <li className="dropdown">
                                <Link>
                                    <span>Patient</span> <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li>
                                        <Link as={Link} to="/patient" className="nav-link scrollto">
                                            Create
                                        </Link>
                                    </li>
                                    <li>
                                        <Link as={Link} to="/editPatient" className="nav-link scrollto">
                                            Edit Patient
                                        </Link>
                                    </li>
                                </ul>
                            </li> */}

                            {/* <li>
                                <Link as={Link} to="/chat" className="nav-link scrollto">
                                    <button className="btn btn-warning">Nhắn tin</button>
                                </Link>
                            </li> */}
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                        {role === '' ? (
                            <>
                                <div className="appointment-btn scrollto d-flex">
                                    <Link as={Link} to="/user/register" className="nav-link scrollto">
                                        <span className="d-none d-md-inline " style={{ color: 'white' }}>
                                            Đăng Ký
                                        </span>
                                    </Link>
                                    <span>/</span>
                                    <Link as={Link} to="/login" className="nav-link scrollto">
                                        <span className="d-none d-md-inline" style={{ color: 'white' }}>
                                            Đăng Nhập
                                        </span>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-primary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <span>{userName}</span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <Link className="text-decoration-none dropdown-item" to={`/logout`}>
                                                Đăng xuất
                                            </Link>
                                        </li>
                                        {role === 'ROLE_PATIENT' ? (
                                            <li>
                                                <Link
                                                    className="text-decoration-none dropdown-item"
                                                    to={`/editPatient`}
                                                >
                                                    Thông tin cá nhân
                                                </Link>
                                            </li>
                                        ) : (
                                            role === 'ROLE_DOCTOR' && (
                                                <li>
                                                    <Link
                                                        className="text-decoration-none dropdown-item"
                                                        to={`/editDoctor`}
                                                    >
                                                        Thông tin cá nhân
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header;
