import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-stars';
import ButtonChat from '../Chat/ButtonChat';
import WinChat from '../Chat/WinChat';
import './DoctorDetail.css';

function DoctorDetail() {
    const [doctor, setDoctor] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
   
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState('');
    const [review, setReview] = useState([]);
    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
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
            .get(`http://localhost:8080/doctor/${id}`)
            .then((resp) => {
                setDoctor(resp.data);
                console.log('doctor', doctor);
            })b
            .catch((error) => console.log(error));
        axios
            .get(`http://localhost:8080/doctor/review?id=${id}`)
            .then((resp) => {
                setReview(resp.data);
                console.log('review', review);
            })
            .catch((error) => console.log(error));
    }, []);
    useMemo(() => {
        axios.get('https://vapi.vnappmob.com/api/province/').then((resp) => {
            setCity(resp.data.results);
            console.log('city', city);
        });

        axios.get(`https://vapi.vnappmob.com/api/province/district/${doctor.address?.city.toString()}`).then((resp) => {
            setDistrict(resp.data.results);
            console.log('district', district);
        });
    }, [doctor]);

    // Nếu chưa có thông tin của bác sĩ, hiển thị "Loading..."
    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="containerDetail">
            <div className='information'>
            <div>
            <img src={doctor.avatarUrl} alt={`Avatar of ${doctor.name}`} className="avatar" />
            <ButtonChat className="button" onOpen={handleOpenModal} isOpen={isOpen} onClose={handleCloseModal}>
                Open Modal
            </ButtonChat>
            <button
                className="button"
                onClick={() => {
                    navigate(`/appointment-list?doctorId=${id}`);
                }}
            >
                Đặt lịch ngay
            </button>
            </div>
            <div>

            <h1><span>{doctor.degree}. </span>{doctor.name}</h1>
            <p>Specialist: {doctor.specialist?.name}</p>
            
            <WinChat isOpen={isOpen} onClose={handleCloseModal} user={user} doctor={doctor.users?.userName} />
            <ReactStars count={5} value={doctor.averageRate} size={24} color2={'#ffd700'} half={false} />
            <p>Phone: {doctor.phone}</p>
            <p>Email: {doctor.email}</p>
            <p>Ngày sinh: {doctor.birthday}</p>
            <p>Kinh nghiệm: {doctor.description}</p>
            <p>Address: {doctor.address?.address}</p>
            <div className="city">
                {city.map(
                    (item) =>
                        item.province_id === doctor.address.city.toString() && (
                            <p className="font-weight-bold">{item.province_name}</p>
                        ),
                )}
            </div>

            <div className="district">
                {district.map(
                    (item) =>
                        item.district_id === doctor.address.district.toString() && (
                            <p className="font-weight-bold">{item.district_name}</p>
                        ),
                )}
            </div>
            </div>
            </div>
            <h2>Bình luận</h2>
            <div className="review-container">
                {review.length > 0 &&
                    review.map((item, index) => (
                        <div className="review" key={index}>
                            <div className="member d-flex align-items-start">
                                <div className="member-info">
                                    <h4
                                        onClick={() => {
                                            navigate(`/doctor-detail/${item.idDoctor}`);
                                        }}
                                    >
                                        {item.schedule.patient.name}
                                    </h4>
                                    <span>{item.dateCreate}</span>
                                    <span>
                                        <ReactStars
                                            count={5}
                                            value={item.rate}
                                            size={24}
                                            color2={'#ffd700'}
                                            half={false}
                                        />
                                    </span>
                                    <h3>{item.reviewString}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default DoctorDetail;
