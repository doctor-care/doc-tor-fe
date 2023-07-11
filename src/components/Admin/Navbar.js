import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './Navbar.css';
import '../../assets/css/style.css';

function Navbar({ toggleSidebar }) {
    const [click, setClick] = useState(false);
    const [left, setLeft] = useState('-100%');
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

    const handleClick = () => {
        setClick(!click);
        setLeft(click ? '-100%' : 0);
    };

    const closeMobileMenu = () => {
        setClick(false);
        setLeft('-100%');
    };

    return (
        <>
            <nav className="navbarAdmin">
                <div className="navbar-container">
                    {/* <button className="navbar-logo" onClick={toggleSidebar}>
                        ///
                    </button> */}
                    <div className="flex justify-center py-4">
                        <Link to={'/'}>
                            <img src="/logo.png" alt="logo" className="w-56 h-20 object-cover" />
                        </Link>
                    </div>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li
                            className="nav-item"
                            onClick={() => {
                                setSelected('0');
                            }}
                        >
                            <Link
                                to="/listDoc"
                                className={`nav-links ${selected === '0' ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Bác sĩ
                            </Link>
                        </li>
                        <li
                            className="nav-item"
                            onClick={() => {
                                setSelected('1');
                            }}
                        >
                            <Link
                                to="/listPat"
                                className={`nav-links ${selected === '1' ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Bệnh nhân
                            </Link>
                        </li>
                        <li
                            className="nav-item"
                            onClick={() => {
                                setSelected('2');
                            }}
                        >
                            <Link
                                to="/create-doctor-service"
                                className={`nav-links ${selected === '2' ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Đăng kí dịch vụ
                            </Link>
                        </li>
                        <li class="dropdown">
                            <a href="#" className={`nav-links ${selected === '3' ? 'active' : ''}`}>
                                Dịch vụ y tế
                            </a>
                            <ul>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle">
                                        Dịch vụ Đông y
                                    </a>
                                    <ul>
                                        {listService.map(
                                            (service) =>
                                                service.typeService === 1 && (
                                                    <li
                                                        key={service.idService}
                                                        onClick={() => {
                                                            setSelected('3');
                                                        }}
                                                    >
                                                        <a href={`/serviceAD/${service.idService}`}>
                                                            {service.nameService}
                                                        </a>
                                                    </li>
                                                ),
                                        )}
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle">
                                        Dịch vụ Tây y
                                    </a>
                                    <ul>
                                        {listService.map(
                                            (service) =>
                                                service.typeService === 2 && (
                                                    <li
                                                        key={service.idService}
                                                        onClick={() => {
                                                            setSelected('3');
                                                        }}
                                                    >
                                                        <a href={`/serviceAD/${service.idService}`}>
                                                            {service.nameService}
                                                        </a>
                                                    </li>
                                                ),
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        {/* <li>
                            <Link as={Link} to="/chatAD" className="nav-link scrollto">
                                <button className="btn btn-warning">Nhắn tin</button>
                            </Link>
                        </li> */}
                        <li
                            className="nav-item"
                            onClick={() => {
                                setSelected('4');
                            }}
                        >
                            <Link
                                to="/dashboard"
                                className={`nav-links ${selected === '4' ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Thống kê
                            </Link>
                        </li>
                        <div className="dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span>Admin</span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <Link className="text-decoration-none dropdown-item" to={`/logout`}>
                                        Đăng xuất
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
