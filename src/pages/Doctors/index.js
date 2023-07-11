import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-stars';
import ButtonChat from '../Chat/ButtonChat';
import WinChat from '../Chat/WinChat';
import './style.css';

export default function Doctor() {
    const navigate = useNavigate();
    const [listDT, setListDT] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [totalPage, setTotalPage] = useState(3);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [fullName, setFullName] = useState('');
    const [specialistName, setSpecialistName] = useState('');
    const [specialists, setSpecialists] = useState([]);


    useEffect(() => {
        axios
            .get(`http://localhost:8080/doctor/page-all?page=${currentPage}&size=${pageSize}`)
            .then((response) => {
                const data = response.data;
                setTotalPage(data.totalPages);
                setPageNumbers(Array.from(Array(data.totalPages).keys()));
                setListDT(data.content);
            })
            .catch((error) => console.error);
    }, [currentPage, pageSize]);
    useEffect(() => {
        getSpecialist();
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/doctor/page-all`, {
                params: {
                    currentPage,
                    pageSize,
                    fullName,
                    specialistName
                },
            })
            .then((response) => {
                const data = response.data;
                setTotalPage(data.totalPages);
                setPageNumbers(Array.from(Array(data.totalPages).keys()));
                setListDT(data.content);
            })
            .catch((error) => console.error);
    }, [currentPage, pageSize]);





    const getSpecialist = () => {
        axios
            .get(`http://localhost:8080/specialist/get-all`)
            .then((response) => {
                console.log("setSpecialists", response.data);
                setSpecialists(response.data);
            })
            .catch((error) => console.error);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        axios
            .get(`http://localhost:8080/doctor/page-all`, {
                params: {
                    currentPage,
                    pageSize,
                    fullName,
                    specialistName
                },
            })
            .then((response) => {
                const data = response.data;
                setTotalPage(data.totalPages);
                setPageNumbers(Array.from(Array(data.totalPages).keys()));
                setListDT(data.content);
            })
            .catch((error) => console.error);
    }





    function handleNextPageClick() {
        if (currentPage < totalPage - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    function handlePreviousPageClick() {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleBeginPageClick() {
        if (currentPage > 0) {
            setCurrentPage(0);
        }
    }
    function handleEndPageClick() {
        if (currentPage < totalPage - 1) {
            setCurrentPage(totalPage - 1);
        }
    }

    function handlePageNumberClick(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <h1>Doctors</h1>
                    <h2>Đội ngũ Bác sĩ ưu tú từ các Bệnh viện hàng đầu</h2>
                </div>
                <form className='col-10 row' onSubmit={(e) => handleSearch(e)}>
                    <div className="form-group col-md-3 d-flex justify-content-end align-items-center">
                        <h5 className='m-0'>Tìm Kiếm Theo</h5>
                    </div>

                    <div className="form-group col-md-4 d-flex justify-content-center align-items-center">
                        <input
                            className='form-control'
                            value={fullName} onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                            placeholder='Họ và tên'
                        />
                    </div>
                    <div className="form-group col-md-3 d-flex justify-content-center align-items-center">
                        <select

                            className="form-control"
                            onChange={(e) => setSpecialistName(e.target.value)}
                        >
                            <option value="">-- Chọn chuyên khoa --</option>
                            {specialists.map((item) => (
                                <option key={item.idSPL} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 d-flex justify-content-start align-items-center">
                        <button type='submit' className='btn btn-info btn-sm text-white'><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
                <div className="row">
                    {listDT.length > 0 &&
                        listDT.map((item, index) => (
                            <div className="col-lg-6" key={index}>
                                <div className="member d-flex align-items-start">
                                    {item.avatarUrl && (
                                        <img
                                            className="avatar-doctor"
                                            key={item.avatarUrl}
                                            src={item.avatarUrl}
                                            alt="Preview"
                                        />
                                    )}
                                    {/* <img src={Doctors1} className="img-fluid" alt=""></img> */}

                                    <div className="member-info">
                                        <h4
                                            onClick={() => {
                                                navigate(`/doctor-detail/${item.idDoctor}`);
                                            }}
                                        >
                                            {item.degree}.{item.name}
                                        </h4>
                                        <span>{item.specialist?.name}</span>
                                        <span>
                                            <ReactStars
                                                count={5}
                                                value={item.averageRate}
                                                size={24}
                                                color2={'#ffd700'}
                                                half={false}
                                            />
                                        </span>

                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div>
                    {listDT.length > 0 && (
                        <div className="pagination justify-content-center mt-6">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination space-x-1">
                                    <li className={` flex page-item ${currentPage === 0 ? 'disabled' : ''} `}>
                                        <button className="page-link bg mr-1" onClick={handleBeginPageClick}>
                                            <i className="fa-solid fa-angles-left"></i>
                                        </button>
                                        <button className="page-link bg rounded-none" onClick={handlePreviousPageClick}>
                                            <i className="fa-solid fa-angle-left"></i>
                                        </button>
                                    </li>
                                    {pageNumbers.slice(currentPage, currentPage + 3).map((pageNumber) => (
                                        <li
                                            key={pageNumber}
                                            className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageNumberClick(pageNumber)}
                                            >
                                                {pageNumber + 1}
                                            </button>
                                        </li>
                                    ))}
                                    {currentPage + 3 < totalPage && (
                                        <li className="page-item disabled">
                                            <span className="page-link">...</span>
                                        </li>
                                    )}
                                    <li
                                        className={` flex  page-item ${currentPage === totalPage - 1 ? 'disabled' : ''
                                            }`}
                                    >
                                        <button className="page-link bg mr-1" onClick={handleNextPageClick}>
                                            <i className="fa-solid fa-chevron-right"></i>
                                        </button>
                                        <button className="page-link bg" onClick={handleEndPageClick}>
                                            <i className="fa-solid fa-angles-right"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
