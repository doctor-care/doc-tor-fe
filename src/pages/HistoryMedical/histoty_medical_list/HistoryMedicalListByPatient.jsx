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
    const [idChoice, setIdChoice] = useState();
    const [userName] = useState(localStorage.getItem('userName'));
    const [patientId] = useState(queryParams.get('patientId'));
    const [historyMedicalList, setHistoryMedicalList] = useState([]);
    const [prescriptionDetailList, setPrescriptionDetailList] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [formData, setFormData] = useState({});
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [isOpen, setIsOpen] = useState(false);

    const [totalPrice, setTotalPrice] = useState();

    const handleToggleDropdown = () => {
        console.log('DROP down');
        setIsOpen(!isOpen);
        console.log('isOpen', isOpen);
    };

    useEffect(() => {
        getPrescriptionList();
        console.log(idChoice);
    }, [idChoice]);

    const getPrescriptionList = () => {
        axios.get(`http://localhost:8080/prescription/get-list/${idChoice}`).then((response) => {
            console.log('RESPONSE LIST prescription', response.data[0]);
            setPrescriptionDetailList(response.data);
        });
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
        return pageNumbers.map((pageNumber, index) => (
            <li key={index} className={`page-item ${page === pageNumber ? 'active' : ''}`}>
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
                                <tr className="align-middle text-nowrap" key={index}>
                                    <th> {index + 1 + page * size}</th>
                                    <td>{convertBookingDate(item.createDate)}</td>
                                    <td className="address-cell">{item.specialistName}</td>
                                    <td>{item.symptom}</td>
                                    <td>{item.diagnosis}</td>
                                    <td className="address-cell">{item.result}</td>
                                    <td>{item.doctorName}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#showPrescription"
                                            onClick={() => {
                                                setIdChoice(item.idHM);
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

                {historyMedicalList.length === 0 && (
                    <div className="row justify-content-center">
                        <div className="col-6 justify-content-center" style={{ minHeight: '328px' }}>
                            <img
                                src="https://i.giphy.com/media/HTSsuRrErs54g1Tqr5/giphy.webp"
                                alt="Flight"
                                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                            />
                            <div className="text-center">
                                <h5 className="">KHÔNG TÌM THẤY LỊCH SỬ KHÁM!</h5>
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
    );
}
export default HistoryMedicalListByPatient;
