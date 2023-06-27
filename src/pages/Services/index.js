import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormService from './FormRegister';

export default function Service() {
    const { id } = useParams();
    console.log('id', id);
    const [isOpen, setIsOpen] = useState(false);
    const [listDoctorService, setListDoctorService] = useState([]);
    const [service, setService] = useState('');
    const [idDoctor, setIdDoctor] = useState('');

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/service/list-doctor-by-id-service?idService=${id}`)
            .then((response) => {
                const data = response.data;
                setListDoctorService(data);
            })
            .catch((error) => console.error);

        axios
            .get(`http://localhost:8080/service/service-by-id-service?idService=${id}`)
            .then((response) => {
                const data = response.data;
                setService(data);
            })
            .catch((error) => console.error);
    }, [id]);

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-title">
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2>{service.nameService}</h2>
                    <h3>{service.priceService} vnd</h3>
                    <p>{service.description}</p>
                </div>

                <div className="row">
                    {listDoctorService.map((doctorService) => (
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="member d-flex align-items-start">
                                <div className="pic">
                                    <img src={doctorService.doctor.avatarUrl} class="img-fluid" alt=""></img>
                                </div>
                                <div className="member-info">
                                    <h4>{doctorService.doctor.name}</h4>
                                    <span>{doctorService.doctor.birthday}</span>
                                    <span>{doctorService.doctor.idDoctor}</span>
                                    <p>Aut maiores voluptates amet et quis praesentium qui senda para</p>
                                    <div>
                                        <button
                                            onClick={isOpen ? handleCloseModal : handleOpenModal}
                                            className="round-button"
                                            style={{ bottom: '40px', right: '30px' }}
                                        >
                                            Register
                                        </button>
                                        <FormService isOpen={isOpen} onClose={handleCloseModal} idDT={doctorService.doctor.idDoctor}></FormService>
                                    </div>
                                    <div className="social">
                                        <a href="">
                                            <i class="ri-twitter-fill"></i>
                                        </a>
                                        <a href="">
                                            <i class="ri-facebook-fill"></i>
                                        </a>
                                        <a href="">
                                            <i class="ri-instagram-fill"></i>
                                        </a>
                                        <a href="">
                                            {' '}
                                            <i class="ri-linkedin-box-fill"></i>{' '}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
