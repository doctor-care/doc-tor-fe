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
            })
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
        <div className="flex justify-content-center " style={{ marginTop: '100px' }}>
            <div className="max-w-screen-xl">
                <div className="row shadow-sm ">
                    <div className="col-4 shadow-sm ">
                        <img src={doctor.avatarUrl} alt={`Avatar of ${doctor.name}`} className="" />
                        <div className="flex justify-content-center ">
                            <ButtonChat
                                className="button"
                                onOpen={handleOpenModal}
                                isOpen={isOpen}
                                onClose={handleCloseModal}
                            >
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
                    </div>
                    <div className="col-8  ">
                        <h1>
                            <span>{doctor.degree}. </span>
                            {doctor.name}
                        </h1>
                        <p>Specialist: {doctor.specialist?.name}</p>

                        <WinChat
                            isOpen={isOpen}
                            onClose={handleCloseModal}
                            user={user}
                            doctor={doctor.users?.userName}
                        />
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
                <h2 className="mt-4">Bình luận</h2>
                <div className="">
                    {review.length > 0 &&
                        review.map((item, index) => (
                            <div className=" shadow-sm rounded-1" key={index}>
                                <div className="member d-flex align-items-start">
                                    <div className="member-info w-100 row">
                                        <div className="col-1  ">
                                            <img src={item.schedule.patient.avatarUrl} />
                                        </div>
                                        <div className="col-11  ">
                                            <div className="flex justify-content-between">
                                                <div className="flex ">
                                                    <h5
                                                        className="mr-2"
                                                        onClick={() => {
                                                            navigate(`/doctor-detail/${item.idDoctor}`);
                                                        }}
                                                    >
                                                        {item.schedule.patient.name}
                                                    </h5>
                                                    <span>{item.dateCreate}</span>
                                                </div>

                                                <div className="flex justify-content-center align-content-center">
                                                    <ReactStars
                                                        count={5}
                                                        value={item.rate}
                                                        size={24}
                                                        color2={'#ffd700'}
                                                        half={false}
                                                    />
                                                </div>
                                            </div>
                                            <p className="mx-2 ">{item.reviewString}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default DoctorDetail;
