import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { startOfWeek, addDays, addWeeks, format } from 'date-fns';
import './home.css';
export default function Home() {
    const [listDoctor, setListDoctor] = useState([]);
    const navigate = useNavigate();
    const getLastMonday = () => {
        const today = new Date(); // Ngày hiện tại
        const startOfLastWeek = addWeeks(startOfWeek(today), -1); // Ngày đầu tiên của tuần trước
        const lastMonday = addDays(startOfLastWeek, 1); // Ngày thứ 2 của tuần trước
        return format(lastMonday, 'yyyy-MM-dd'); // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
    };
    const getNext = (monday) => {
        const nextday = addWeeks(new Date(monday), 1); // thêm 7 ngày
        return format(nextday, 'yyyy-MM-dd'); // Định dạng ngày thành chuỗi 'yyyy-MM-dd'
    };

    useEffect(() => {
        const fetchData = async () => {
            const startDate = getLastMonday(); // Lấy ngày thứ Hai của tuần trước
            console.log('startday', startDate);
            const endDate = getNext(startDate); // Lấy ngày thứ Hai của tuần sau
            console.log('enday', endDate);
            try {
                if (startDate && endDate) {
                    const response = await axios.get(
                        `http://localhost:8080/report/top-doctor?startDate=${startDate}&endDate=${endDate}`,
                    );
                    setListDoctor(response.data);
                }

                console.log('listDoctor', listDoctor);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <section id="hero" className="d-flex align-items-center">
                <div className="container">
                    <h1>Chào mừng bạn đến với DOCTOR_CARE</h1>
                    <h3>Bạn thấy không khỏe? Hãy để Doctor-care chăm sóc cho bạn!</h3>
                    <Link to={'/specialist'} className="btn-get-started scrollto text-decoration-none">
                        ĐẶT LỊCH HẸN
                    </Link>
                </div>
            </section>
            <section id="why-us" className="why-us">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 d-flex align-items-stretch">
                            <div className="content">
                                <h3>
                                    Tại sao là <br></br> Doctor-care?
                                </h3>
                                <p>
                                    Chúng tôi có đội ngũ bác sĩ hàng đầu Việt Nam, luôn sẵn sàng phục vụ, chăm sóc cho
                                    sức khỏe của bạn và gia đình bạn.
                                </p>
                                <div className="text-center">
                                    <a href="#" className="more-btn">
                                        Tìm hiểu thêm <i className="bx bx-chevron-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 d-flex align-items-stretch">
                            <div className="icon-boxes d-flex flex-column justify-content-center">
                                <div className="row">
                                    <div className="col-xl-4 d-flex align-items-stretch">
                                        <div className="icon-box mt-4 mt-xl-0">
                                            <i className="bx bx-receipt"></i>
                                            <h4>Hơn 300.000 khách hàng</h4>
                                            <p>
                                                Trong suốt 2 năm thành lập, đã có hơn 300.000 khách hàng đến với
                                                doctor-care.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 d-flex align-items-stretch">
                                        <div className="icon-box mt-4 mt-xl-0">
                                            <i className="bx bx-cube-alt"></i>
                                            <h4>Thu hút hơn 500 bác sĩ xuất sắc</h4>
                                            <p>
                                                Với sự hấp dẫn của cơ hội làm việc, doctor-care đã thu hút hơn 500 bác
                                                sĩ xuất sắc trên khắp cả nước
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 d-flex align-items-stretch">
                                        <div className="icon-box mt-4 mt-xl-0">
                                            <i className="bx bx-images"></i>
                                            <h4>Dịch vụ y tế tại nhà</h4>
                                            <p>
                                                Hàng loạt phiếu đăng kí sử dụng dịch vụ y tế tại nhà với 3 tiêu chí An
                                                toàn - Tiết kiệm - Hữu ích.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="why-us" className="why-us">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 d-flex align-items-stretch" style={{ width: '100%' }}>
                            <div className="d-flex flex-column justify-content-center">
                                <div className="row">
                                    <div className="col-lg-4 d-flex align-items-stretch" style={{ width: '32%' }}>
                                        <div className="content">
                                            <h3>Bác sĩ được yêu thích nhất!!</h3>
                                            <div className="text-center" onClick={()=>{
                                                    navigate(`/doctors`);
                                                }}>
                                                <a href="#" className="more-btn">
                                                    Tìm hiểu thêm <i className="bx bx-chevron-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="stroll-bar col-lg-8 d-flex align-items-stretch"
                                        style={{ width: '65%' }}
                                    >
                                        <div className="icon-boxes mt-4 mt-lg-0 d-flex overflow-auto">
                                            {listDoctor.map((doctor, index) => (
                                                <div className="icon-box doctor-box" key={index}>
                                                    <img
                                                        src={doctor.avatar}
                                                        alt={doctor.name}
                                                        className="doctor-image"
                                                    />
                                                    <h4>{doctor.name}</h4>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
