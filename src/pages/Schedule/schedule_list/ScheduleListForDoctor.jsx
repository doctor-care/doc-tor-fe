/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import './ScheduleListForDoctor.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import { toast } from 'react-toastify';

function ScheduleListForDoctor() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [status] = useState(localStorage.getItem('status'));
    const [userName] = useState(localStorage.getItem('userName'));
    const [idShift, setIdShift] = useState();
    const [doctorId, setDoctorId] = useState('');
    const [appDate, setAppDate] = useState('');
    const [appointmentDate, setAppointmentDate] = useState([]);
    const [statusscd, setStatusscd] = useState(0);
    const [shiftList, setShiftList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [formData, setFormData] = useState({});
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sortDirection, setSortDirection] = useState('DESC');

    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        console.log('DROP down');
        setIsOpen(!isOpen);
        console.log('isOpen', isOpen);
    };

    //CHỨC NĂNG TÌM KIẾM
    const [pageNumber, setPageNumber] = useState(0);

    const [totalPages, setTotalPages] = useState();

    const convertBookingDate = (bookingDate) => {
        var datePart = bookingDate.split('T')[0];
        var parts = datePart.split('-');
        var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
        return formattedDate;
    };

    const convertAppointmentDate = (appDate) => {
        var parts = appDate.split('-');
        var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
        return formattedDate;
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

    useEffect(() => {
        getDoctorId();
        getShiftList();
    }, []);

    useEffect(() => {
        try {
            axios
                .get('http://localhost:8080/schedule/page/doctor', {
                    params: {
                        userName,
                        idShift,
                        appDate,
                        statusscd,
                        page,
                        size,
                        sortDirection,
                    },
                })
                .then((response) => {
                    setScheduleList(response.data.content);
                    setTotalPages(response.data.totalPages);
                });
        } catch (error) {
            console.log(error);
        }
    }, [userName, idShift, appDate, statusscd, page, size, sortDirection]);

    const getAppointmentDateList = (id) => {
        try {
            axios.get('http://localhost:8080/appointment/get-date?doctorId=' + id).then((response) => {
                console.log('setAppointmentDate(response.data);', response);
                setAppointmentDate(response.data);
                // getAppointmentList(response.data[0]);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getShiftList = () => {
        try {
            axios.get('http://localhost:8080/shift/get-all').then((response) => {
                console.log('setShiftList', response);
                setShiftList(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getDoctorId = () => {
        try {
            //get doctor id from user which doctor login in localstorage
            axios.get('http://localhost:8080/doctor/username/' + userName).then((response) => {
                console.log('response.data', response.data);
                setDoctorId(response.data.idDoctor);
                //get date list from doctor id
                getAppointmentDateList(response.data.idDoctor);
            });
        } catch (error) {
            console.log(error);
        }
    };

    //DuyNT58 lấy danh sách vé máy bay
    const fetchScheduleList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/schedule/page/doctor', {
                params: {
                    userName,
                    idShift,
                    appDate,
                    statusscd,
                    page,
                    size,
                },
            });
            console.log('RESPONSE LIST DATAA', response);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    //DuyNT58 nhập thông tin tìm kiếm
    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    //DuyNT58 chọn trang muốn hiển thị
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    //DuyNT58 tính toán trang được hiển thị trên màn hình
    const calculatePageNumbers = () => {
        const soTrangToiDa = 3;
        const trangDau = Math.max(0, page - Math.floor(soTrangToiDa / 2));
        const trangCuoi = Math.min(totalPages - 1, trangDau + soTrangToiDa - 1);
        const pageNumbers = [];
        for (let i = trangDau; i <= trangCuoi; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    //DuyNT58 hiển thị giao diện số trang
    const renderPageNumbers = () => {
        const pageNumbers = calculatePageNumbers();
        return pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className={`page-item ${page === pageNumber ? 'active' : ''}`}>
                <button type="button" className="page-link bg btn btn-sm" onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber + 1}
                </button>
            </li>
        ));
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
        <div className="container schedule-container bg-body shadow mg-top-60">
            <div className="pt-5 pb-2">
                <div className="text-center pb-2">
                    <h1>DANH SÁCH LỊCH HẸN</h1>
                </div>

                {/* form search */}
                <form className="row justify-content-center">
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <h5 className="fw-bold m-0">Tìm Kiếm Theo</h5>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <select
                            name="diemDi"
                            id="diemDi"
                            onChange={(e) => {
                                setAppDate(e.target.value);
                            }}
                            className="border border-info text-center"
                        >
                            <option value="">-- Chọn ngày --</option>
                            {appointmentDate.map((date) => (
                                <option key={date} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <select
                            name="diemDi"
                            id="diemDi"
                            onChange={(e) => {
                                setIdShift(e.target.value);
                            }}
                            className="border border-info text-center"
                        >
                            <option value="">-- Chọn ca làm --</option>
                            {shiftList.map((shift) => (
                                <option key={shift.idShifts} value={shift.idShifts}>
                                    {shift.shiftsName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <select
                            name="diemDi"
                            id="diemDi"
                            onChange={(e) => {
                                setStatusscd(e.target.value);
                            }}
                            className="border border-info text-center"
                        >
                            <option value={0}> Chưa xác nhận </option>
                            <option value={1}> Đã xác nhận </option>
                            <option value={4}> Đã hoàn tất </option>
                            <option value={5}> Đã hủy </option>
                        </select>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-end align-items-center">
                        <h5 className="fw-bold m-0">Sắp xếp</h5>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <select
                            value={sortDirection}
                            onChange={(e) => {
                                setSortDirection(e.target.value);
                                console.log(sortDirection);
                            }}
                            className="border border-info text-center"
                        >
                            <option value="DESC">-- Mới nhất --</option>
                            <option value="ASC">-- Cũ nhất --</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="mh-300">
                <table className="table table-striped border text-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ngày Booking</th>
                            <th scope="col">Tên bệnh nhân</th>
                            <th scope="col">Ngày hẹn khám</th>
                            <th scope="col">Ca khám</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleList.map((item, index) => {
                            return (
                                <tr className="align-middle text-nowrap" key={item.idScd}>
                                    <th> {index + 1 + page * size}</th>
                                    <td>{convertBookingDate(item.createDate)}</td>
                                    <td>
                                        <Link
                                            as={Link}
                                            to={`/history-medical-list?patientId=${item.patientId}`}
                                            className="nav-link scrollto text-primary"
                                            title={'XEM LỊCH SỬ BỆNH ÁN'}
                                        >
                                            {item.patientName}
                                        </Link>
                                    </td>
                                    <td>{convertAppointmentDate(item.apmDate)}</td>
                                    <td>{item.shiftName}</td>
                                    <td className="address-cell">{item.scheduleAddress}</td>
                                    <td className="">
                                        <button
                                            className={`btn btn-sm fw-bold text-white ${getClassCSSByStatusSCD(
                                                item.statusScd,
                                            )}`}
                                            disabled={true}
                                        >
                                            {showStatusCSD(item.statusScd)}
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
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                {item.statusScd > 0 && (
                                                    <li>
                                                        <Link
                                                            className="text-decoration-none dropdown-item"
                                                            to={`/schedule/${item.idScd}`}
                                                        >
                                                            XEM CHI TIẾT
                                                        </Link>
                                                    </li>
                                                )}

                                                {item.statusScd === 0 && (
                                                    <li>
                                                        <Link
                                                            className="text-decoration-none dropdown-item"
                                                            to={`/schedule/${item.idScd}`}
                                                        >
                                                            HỦY / XÁC NHẬN
                                                        </Link>
                                                    </li>
                                                )}
                                                {item.statusScd === 1 && (
                                                    <li>
                                                        <Link
                                                            className="text-decoration-none dropdown-item"
                                                            to={`/history-medical/create/${item.idScd}`}
                                                        >
                                                            ĐÃ KHÁM XONG
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {scheduleList.length === 0 && (
                    <div className="row justify-content-center">
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ minHeight: '300px' }}
                        >
                            <div className="text-center">
                                <h3 className="">
                                    <span>KHÔNG CÓ LỊCH HẸN NÀO!</span>
                                    {/* <span className="text-uppercase">{showStatusCSD(statusscd)}</span>
                                    <span> NÀO!</span> */}
                                </h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                <button
                                    type="button"
                                    className="page-link bg-primary text-white bg"
                                    onClick={() => setPage(0)}
                                    disabled={page === 0}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-chevron-double-left"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                <button
                                    type="button"
                                    className="page-link bg-primary text-white bg"
                                    disabled={page === 0}
                                    onClick={() => handlePageChange(page - 1)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-chevron-left"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                        />
                                    </svg>
                                </button>
                            </li>
                            {renderPageNumbers()}

                            <li className={`page-item   ${page === totalPages - 1 ? 'disabled' : ''}`}>
                                <button
                                    type="button"
                                    className={`page-link  bg-primary text-white none bg   ${
                                        page === totalPages - 1 ? 'disabled' : ''
                                    }`}
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages - 1}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-chevron-right"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <li className={`page-item   ${page === totalPages - 1 ? 'disabled' : ''}`}>
                                <button
                                    className={`page-link bg-primary text-white bg ${
                                        page === totalPages - 1 ? 'disabled' : ''
                                    }`}
                                    onClick={() => setPage(totalPages - 1)}
                                    disabled={page === totalPages - 1}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-chevron-double-right"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                                        />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}
export default ScheduleListForDoctor;
