import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Header() {
    const [listService, setListService] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('role'));
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

    // const getRole = () => {
    //     if (localStorage.getItem('role') !== '') {
    //         const loginRole = localStorage.getItem('role');
    //         setRole(loginRole);
    //     } else {
    //         setRole('');
    //     }
    // }

    // console.log("accessToken", localStorage.getItem('accessToken'));

    console.log('role', role);

    return (
        <div>
            <header id="header" className="fixed-top">
                <div className="container d-flex justify-content-end">
                    {role === '' ? (
                        <>
                            <div className="appointment-btn scrollto d-flex">
                                <Link as={Link} to="/user/register" className="nav-link scrollto">
                                    <span className="d-none d-md-inline">Đăng Ký</span>
                                </Link>
                                <span>/</span>
                                <Link as={Link} to="/login" className="nav-link scrollto">
                                    <span className="d-none d-md-inline">Đăng Nhập</span>
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
                                    <li>
                                        <Link
                                            className="text-decoration-none dropdown-item"
                                            to={`/editPatient`}
                                        >
                                            Thông tin cá nhân
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
                <div className="container d-flex align-items-center">
                    <h1 className="logo me-auto">
                        <a href="index.html">Doctor-care</a>
                    </h1>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li>
                                <Link as={Link} to="/" className="nav-link scrollto active">
                                    Trang chủ
                                </Link>
                            </li>
                            {role !== 'ROLE_DOCTOR' && (
                                <>
                                    <li className="dropdown">
                                        <Link className="text-decoration-none">
                                            <span>Bác sĩ</span> <i className="bi bi-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link as={Link} to="/doctors" className="nav-link scrollto">
                                                    Danh sách bác sĩ
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <Link>
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
                                                                <Link
                                                                    key={service.idService}
                                                                    as={Link}
                                                                    to={`/service/${service.idService}`}
                                                                >
                                                                    <span>{service.nameService}</span>
                                                                </Link>
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
                                                                <Link
                                                                    key={service.idService}
                                                                    to={`/service/${service.idService}`}
                                                                >
                                                                    <span>{service.nameService}</span>
                                                                </Link>
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
                                    <li className="dropdown">
                                        <Link className="text-decoration-none">
                                            <span>Lịch Hẹn</span> <i className="bi bi-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link
                                                    as={Link}
                                                    to="/doctor/schedule-list"
                                                    className="nav-link scrollto"
                                                >
                                                    Danh sách lịch hẹn
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <Link className="text-decoration-none">
                                            <span>Lịch Làm việc</span> <i className="bi bi-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link as={Link} to="/appointment/create" className="nav-link scrollto">
                                                    Thêm lịch làm việc
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

                            {role === 'ROLE_PATIENT' && (
                                <>
                                    <li>
                                        <Link as={Link} to="/history-medical-list" className="nav-link scrollto">
                                            Lịch sử khám
                                        </Link>
                                    </li>
                                    <li className="dropdown">
                                        <Link className="text-decoration-none">
                                            <span>Lịch Hẹn</span> <i className="bi bi-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link as={Link} to="/specialist" className="nav-link scrollto">
                                                    Đặt lịch hẹn
                                                </Link>
                                            </li>
                                            <li>
                                                <Link as={Link} to="/user/schedule-list" className="nav-link scrollto">
                                                    Danh sách lịch hẹn
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



                            <li className="dropdown">
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
                            </li>
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
                    </nav>
                </div>
            </header>
            \
        </div>
    );
}

export default Header;
