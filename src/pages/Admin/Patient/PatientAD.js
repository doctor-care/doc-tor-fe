
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import { toast } from 'react-toastify';

function PatientAD() {
    const navigate = useNavigate();
    const [listDT, setListDT] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [totalPage, setTotalPage] = useState(3);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:8080/patient/all`, {
                params: {
                    currentPage,
                    pageSize,
                    fullName,
                    phone
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

    const handleSearch = (e) => {
        e.preventDefault();
        axios
            .get(`http://localhost:8080/patient/all`, {
                params: {
                    currentPage,
                    pageSize,
                    fullName,
                    phone
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

    return (
        <div className="container ticket-container bg-body shadow mg-top-60">
            <div className="pt-5 pb-2">
                <div className="text-center pb-2">
                    <h1>DANH SÁCH BỆNH NHÂN</h1>
                </div>

                {/* form search */}
                <div className="row">
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
                            <input
                                className='form-control'
                                value={phone} onChange={(e) => {
                                    setPhone(e.target.value)
                                }}
                                placeholder='Số điện thoại'
                            />
                        </div>
                        <div className="col-md-2 d-flex justify-content-start align-items-center">
                            <button type='submit' className='btn btn-info btn-sm text-white'><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </form>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">

                    </div>
                </div>
            </div>
            <div className="mh-300">
                <table className="table table-striped border text-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Ngày sinh</th>
                            <th scope="col">Lịch sử bệnh án</th>
                            <th scope="col">Nhóm máu</th>
                            <th scope="col">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listDT.map((item, index) => {
                            return (
                                <tr className="align-middle text-nowrap" key={index}>
                                    <th> {index + 1 + currentPage * pageSize}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.birthday}</td>
                                    <td>{item.healthHistory}</td>
                                    <td>{item.bloodType}</td>
                                    <td>
                                        <Link className="text-decoration-none" to={`/patient-detail-AD/${item.idPatient}`}>
                                            Chi tiết
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {listDT.length === 0 && (
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
                            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageNumberClick(pageNumber)}>
                                    {pageNumber + 1}
                                </button>
                            </li>
                        ))}
                        {currentPage + 3 < totalPage && (
                            <li className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        )}
                        <li className={` flex  page-item ${currentPage === totalPage - 1 ? 'disabled' : ''}`}>
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
        </div>
    );
}
export default PatientAD;
