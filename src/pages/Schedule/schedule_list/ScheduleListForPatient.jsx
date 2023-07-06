/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import './ScheduleListForDoctor.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import { toast } from 'react-toastify';

function ScheduleListForPatient() {
    const navigate = useNavigate();
    const [userName] = useState(localStorage.getItem('userName'));
    const [statusscd, setStatusscd] = useState(0);
    const [scheduleList, setScheduleList] = useState([]);
    const [formData, setFormData] = useState({});
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sortDirection, setSortDirection] = useState('DESC');

    const [totalPages, setTotalPages] = useState();

    const convertBookingDate = (bookingDate) => {
        var datePart = bookingDate.split('T')[0];
        var parts = datePart.split('-');
        var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
        return formattedDate;
    };

    const convertTime = (bookingDate) => {
        var datePart = bookingDate.split('T')[1];
        var parts = datePart.split(':');
        var formattedTime = parts[0] + ':' + parts[1];
        return formattedTime;
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
                return 'hoàn tất';
            case 5:
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    useEffect(() => {
        try {
            axios
                .get('http://localhost:8080/schedule/page/patient', {
                    params: {
                        userName,
                        statusscd,
                        page,
                        size,
                        sortDirection,
                    },
                })
                .then((response) => {
                    console.log('RESPONSE LIST DATAA', response);
                    console.log('length', response.data.content.length);
                    setScheduleList(response.data.content);
                    setTotalPages(response.data.totalPages);
                });
        } catch (error) {
            console.log(error);
        }
    }, [userName, statusscd, page, size, sortDirection]);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

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
                    <h1>DANH SÁCH LỊCH HẸN</h1>
                </div>

                {/* form search */}
                <form className="row d-flex justify-content-around">
                    <div className="col-6 d-flex">
                        <div className="form-group col-4 d-flex justify-content-center align-items-center">
                            <h5 className="fw-bold m-0">Tìm Kiếm Theo</h5>
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <select
                                name="diemDi"
                                id="diemDi"
                                onChange={(e) => {
                                    setStatusscd(e.target.value);
                                }}
                                className="border text-center border-info"
                            >
                                <option value="0"> Chưa xác nhận </option>
                                <option value="1"> Đã xác nhận </option>
                                <option value="4"> Đã hoàn tất </option>
                                <option value="5"> Đã hủy </option>
                            </select>
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <div className="d-flex col-4 justify-content-end align-items-center">
                            <h5 className="fw-bold m-0">Sắp xếp</h5>
                        </div>

                        <div className="col-4 d-flex justify-content-center align-items-center">
                            <select
                                value={sortDirection}
                                onChange={(e) => {
                                    setSortDirection(e.target.value);
                                    console.log(sortDirection);
                                }}
                                className="text-center border border-info"
                            >
                                <option value="DESC">-- Mới nhất --</option>
                                <option value="ASC">-- Cũ nhất --</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div className="mh-300">
                <table className="table table-striped border text-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ngày Đặt Lịch</th>
                            <th scope="col">Giờ Đặt Lịch</th>
                            <th scope="col">Tên bệnh nhân</th>
                            <th scope="col">Ngày hẹn khám</th>
                            <th scope="col">Ca khám</th>
                            <th scope="col">Bác sĩ khám</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleList.map((item, index) => {
                            return (
                                <tr className="align-middle text-nowrap" key={item.idScd}>
                                    <th> {index + 1 + page * size}</th>
                                    <td className="text-center">{convertBookingDate(item.createDate)}</td>
                                    <td className="text-center">{convertTime(item.createDate)}</td>
                                    <td>{item.patientName}</td>
                                    <td className="text-center">{convertAppointmentDate(item.apmDate)}</td>
                                    <td>{item.shiftName}</td>
                                    <td>{item.doctorName}</td>
                                    <td className="text-uppercase text-success">{showStatusCSD(item.statusScd)}</td>
                                    <td>
                                        <Link className="text-decoration-none" to={`/schedule/${item.idScd}`}>
                                            <button className="btn btn-primary btn-sm">Chi tiết</button>
                                        </Link>
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
                                <h3 className="">KHÔNG CÓ LỊCH HẸN NÀO!</h3>
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
export default ScheduleListForPatient;
