/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
// import './ScheduleListForDoctor.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import { toast } from 'react-toastify';

function HistoryMedicalListByPatient() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [userName] = useState(localStorage.getItem('userName'));
    const [patientId] = useState(queryParams.get('patientId'));
    const [historyMedicalList, setHistoryMedicalList] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [formData, setFormData] = useState({});
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
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

    //CHỨC NĂNG XÓA
    const [selectedObject, setSelectedObject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [maVeDelete, setMaVeDelete] = useState();
    const [tenHanhKhachDelete, setTenHanhKhachDelete] = useState();
    const confirmDelete = (veMayBay) => {
        console.log('vemaybaytostring', veMayBay);
        setSelectedObject(veMayBay);
        setMaVeDelete(veMayBay.maVe);
        setTenHanhKhachDelete(veMayBay.hanhKhach.tenHanhKhach);
        setIsModalOpen(true);
    };

    useEffect(() => {
        try {
            axios
                .get('http://localhost:8080/history-medical/page/patient', {
                    params: {
                        userName,
                        patientId,
                        page,
                        size,
                    },
                })
                .then((response) => {
                    console.log('RESPONSE LIST DATAA', response);
                    console.log('length', response.data.content.length);
                    setHistoryMedicalList(response.data.content);
                    setTotalPages(response.data.totalPages);
                });
        } catch (error) {
            console.log(error);
        }
    }, [userName, patientId, page, size]);

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
                <a className="page-link" href="#" onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber + 1}
                </a>
            </li>
        ));
    };

    return (
        <div className="container ticket-container bg-body shadow mg-top-60">
            <div className="pt-5 pb-2">
                <div className="text-center pb-2">
                    <h1>LỊCH SỬ KHÁM BỆNH</h1>
                </div>

                {/* form search */}
                {/* <form className="row justify-content-center">
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <h5>Tìm Kiếm Theo</h5>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <select
                            name="diemDi"
                            id="diemDi"
                            onChange={(e) => {
                                setAppDate(e.target.value);
                            }}
                            className="form-control text-center"
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
                            className="form-control text-center"
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
                            className="form-control text-center"
                            // selected={ === 1}
                        >
                            <option value="0"> Chưa xác nhận </option>
                            <option value="1"> Đã xác nhận </option>
                            <option value="4"> Đã hoàn tất </option>
                        </select>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-end align-items-center">
                        <button type="submit" className="btn bg">
                            {' '}
                            SẮP XẾP
                        </button>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <select
                            name="diemDen"
                            id="diemDen"
                            // value={formData.diemDen}
                            // onChange={handleInputChange}
                            className="form-control text-center"
                        >
                            <option value="">-- Mới nhất --</option>
                            <option value="">-- Cũ nhất --</option>
                        </select>
                    </div>
                </form> */}
            </div>
            <div className="mh-300">
                <table className="table table-striped border text-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ngày Khám</th>
                            <th scope="col">Khoa khám</th>
                            <th scope="col">Triệu chứng</th>
                            <th scope="col">Chuẩn đoán</th>
                            <th scope="col">Giải pháp</th>
                            <th scope="col">Bác sĩ khám</th>
                            <th scope="col">Đơn thuốc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyMedicalList.map((item, index) => {
                            return (
                                <tr className="align-middle text-nowrap" key={item.idScd}>
                                    <th> {index + 1 + page * size}</th>
                                    <td>{convertBookingDate(item.createDate)}</td>
                                    <td className="address-cell">{item.specialistName}</td>
                                    <td>{item.symptom}</td>
                                    <td>{item.diagnosis}</td>
                                    <td className="address-cell">{item.result}</td>
                                    <td>{item.doctorName}</td>
                                    <td>
                                        <button className="btn btn-primary">Xem đơn thuốc</button>
                                    </td>
                                    {/* <td>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-primary dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Chọn
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li>
                                                    <Link
                                                        className="text-decoration-none dropdown-item"
                                                        to={`/schedule/${item.idScd}`}
                                                    >
                                                        XEM CHI TIẾT
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="text-decoration-none dropdown-item"
                                                        to={`/schedule/${item.idScd}`}
                                                    >
                                                        XÁC NHẬN
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="text-decoration-none dropdown-item"
                                                        to={`/history-medical/create/${item.idScd}`}
                                                    >
                                                        ĐÃ KHÁM XONG
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {historyMedicalList.length === 0 && (
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

            {historyMedicalList.length >= 5 && (
                <div className="pagination">
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                <button
                                    type="button"
                                    className="page-link bg-warning text-white bg"
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
                                    className="page-link bg-success text-white bg"
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
                                    className={`page-link  bg-success text-white none bg   ${
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
                                    className={`page-link bg-danger text-white bg ${
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
export default HistoryMedicalListByPatient;
