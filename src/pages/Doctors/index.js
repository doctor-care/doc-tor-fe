import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-stars';
import ButtonChat from '../Chat/ButtonChat';
import WinChat from '../Chat/WinChat';

export default function Doctor() {
    
    const navigate = useNavigate();
    const [listDT, setListDT] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [totalPage, setTotalPage] = useState(3);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState('');
    const [dt, setDt] = useState('');

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const handleDt = (username) => {
        setDt(username);
        console.log('bác sĩ', dt);
    };
    function generateRandomString() {
        const currentTime = new Date().getTime();
        const randomValue = Math.random().toString(36).substring(2);
        return `${currentTime}-${randomValue}`;
    }
    useEffect(() => {
        const userLogin = localStorage.getItem('userName');
        if (userLogin) {
            setUser(userLogin);
        } else {
            setUser(generateRandomString());
        }
    }, []);

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
                    <h2>Doctors</h2>
                    <p>Đội ngũ Bác sĩ ưu tú từ các Bệnh viện hàng đầu</p>
                </div>
                <div className="row">
                    {listDT.length > 0 &&
                        listDT.map((item, index) => (
                            <div
                                className="col-lg-6"
                            >
                                <div className="member d-flex align-items-start" >
                                    <div className="img-fluid">
                                        {item.avatarUrl && (
                                            <img key={item.avatarUrl} src={item.avatarUrl} alt="Preview" />
                                        )}
                                        {/* <img src={Doctors1} className="img-fluid" alt=""></img> */}
                                    </div>
                                    <div className="member-info">
                                        <h4>
                                            {item.degree}.{item.name}
                                        </h4>
                                        <span>{item.specialist.name}</span>
                                        <span>
                                            <ReactStars
                                                count={5}
                                                value={item.averageRate}
                                                size={24}
                                                color2={'#ffd700'}
                                                half={false}
                                            />
                                        </span>
                                        <ButtonChat
                                            className="btn-modal"
                                            onOpen={handleOpenModal}
                                            isOpen={isOpen}
                                            onClose={handleCloseModal}
                                            onClick={(e) => {
                                                e.nativeEvent.stopImmediatePropagation();
                                                handleDt(item.username);
                                            }}
                                        >
                                            Open Modal
                                        </ButtonChat> <button onClick={(e)=>{navigate(`/appointment-list?doctorId=${item.idDoctor}`)}}>Xem chi tiết</button>
                                        <WinChat
                                            isOpen={isOpen}
                                            onClose={handleCloseModal}
                                            user={user}
                                            doctor={dt}
                                        ></WinChat>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div>
                    {listDT.length > 0 && (
                        <div className="pagination justify-content-center">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                        <button className="page-link bg" onClick={handleBeginPageClick}>
                                            <i class="fa-solid fa-angles-left"></i>
                                        </button>
                                        <button className="page-link bg" onClick={handlePreviousPageClick}>
                                            <i class="fa-solid fa-angle-left"></i>
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
                                    <li className={`page-item ${currentPage === totalPage - 1 ? 'disabled' : ''}`}>
                                        <button className="page-link bg" onClick={handleNextPageClick}>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </button>
                                        <button className="page-link bg" onClick={handleEndPageClick}>
                                            <i class="fa-solid fa-angles-right"></i>
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
