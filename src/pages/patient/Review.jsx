import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NotFound from '@/components/common/NotFound';

export default function Review() {
    const [dataSchedule, setDataSchedule] = useState({});
    const navigate = useNavigate();
    const user = localStorage.getItem('userName');
    const role = localStorage.getItem('role');
    const { id } = useParams();
    const [review, setReview] = useState({ id: id, rating: 5 });
    const [err, setErr] = useState();
    const [patientId, setPatientId] = useState('');

    const ratingChanged = (newRating) => {
        console.log(newRating);
        setReview({ ...review, rating: newRating });
    };

    const handleReview = (event) => {
        console.log(event.target.value);
        setReview({ ...review, review: event.target.value });
        setErr('');
    };

    const submitReview = () => {
        if (review.review == undefined || review.review.trim() == '') {
            setErr('Vui lòng nhập đánh giá');
        } else {
            axios
                .post('http://localhost:8080/review/create', review, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });

            navigate(`/doctor-detail/${dataSchedule?.appointment.doctor.idDoctor}`);
        }
    };
    console.log(review);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/schedule/id/${id}`)
            .then((res) => {
                console.log('res.data', res.data);
                setDataSchedule(res.data);
                // review.
            })
            .catch((err) => {
                console.log(err);
            });
        try {
            if(user!==''&&role==='ROLE_PATIENT'){
                axios.get(`http://localhost:8080/patient/username?userName=${user}`).then((response) => {
                    setPatientId(response.data.idPatient);
                    console.log('PatientId', patientId);
                });
            }
            
        } catch (error) {
            console.log(error);
        }
        // if(user!==''){
        //     try {
        //         axios.get(`http://localhost:8080/patient/username?userName=${user}`).then((response) => {
        //             setPatientId(response.data.idPatient);
        //             console.log('PatientId', patientId);
        //         });
        //     } catch (error) {
        //         console.log(error);
        //     }
        //     console.log('PatientId', patientId);
        //     if (patientId !== dataSchedule?.patient?.idPatient) {
        //         console.log("dataSchedule",dataSchedule);
        //         toast.error('Bạn không được cấp quyền truy cập')
        //         navigate(`/`);
        //     }
        // }else{
        //     toast.error('Đăng nhập để đánh giá')
        //     navigate(`/`);
        // }
    }, []);
    return (
        <div className="m-5" style={{marginTop:30}}>
            {patientId === dataSchedule?.patient?.idPatient && (
                <div>
                    <h3>-  </h3>
                    <h1 className="text-center">ĐÁNH GIÁ CUỘC HẸN</h1>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <td>Tên bệnh nhân:</td>
                                <td>{dataSchedule?.patient?.name}</td>
                                <td>Ngày sinh:</td>
                                <td>{dataSchedule?.patient?.birthday}</td>
                            </tr>
                            <tr>
                                <td>Ngày hẹn:</td>
                                <td>{dataSchedule?.appointment?.date}</td>
                                <td>Giờ hẹn:</td>
                                <td>{dataSchedule?.appointment?.shifts?.shiftsName}</td>
                            </tr>
                            <tr>
                                <td>Bác sĩ:</td>
                                <td>{dataSchedule?.appointment?.doctor?.name}</td>
                                <td>Số điện thoại:</td>
                                <td>{dataSchedule?.appointment?.doctor?.phone}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="row">
                        <h2>Đánh giá</h2>
                        <div className="col-12">
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                value={review.rating}
                                size={24}
                                color2={'#ffd700'}
                                half={false}
                            />
                            {err && <div style={{ color: 'red' }}>{err}</div>}
                            <textarea
                                name=""
                                id=""
                                style={{ height: '100px', width: '1200px', border: '1px solid gray' }}
                                placeholder="Vui lòng nhập đánh giá ..."
                                onChange={handleReview}
                            ></textarea>
                        </div>
                        <div className="col-2">
                            {' '}
                            <button className="btn btn-success" onClick={submitReview}>
                                Gửi đánh giá
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {patientId === '' && (
                <div>
                    <div className="grid h-[calc(100vh-60px)] px-4 bg-white place-content-center">
                        <div className="text-center">
                            <h1 className="font-black text-gray-200 text-9xl">404</h1>

                            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                            <p className="mt-4 text-gray-500">We can't find that page.</p>
                            <p>Bạn không được cấp quyền truy cập trang này</p>
                        </div>
                    </div>
                </div>
            )}
            {patientId !== '' && patientId !== dataSchedule?.patient?.idPatient && (
                <div>
                    <div className="grid h-[calc(100vh-60px)] px-4 bg-white place-content-center">
                        <div className="text-center">
                            <h1 className="font-black text-gray-200 text-9xl">404</h1>

                            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                            <p className="mt-4 text-gray-500">We can't find that page.</p>
                            <p>Bạn không được cấp quyền truy cập trang này</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
