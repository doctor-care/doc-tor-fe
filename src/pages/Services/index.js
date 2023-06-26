import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Service() {
    const { id } = useParams();
    console.log('id', id);

    const [listDoctorService, setListDoctorService] = useState([]);
    const [service, setService] = useState('');


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
                    <p>
                       {service.description}
                    </p>
                </div>

                <div className="row">
                {listDoctorService.map((doctorService) => (  <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="member d-flex align-items-start">
              <div className="pic">
                <img
                  src={doctorService.doctor.avatarUrl}
                  class="img-fluid"
                  alt=""
                ></img>
              </div>
              <div className="member-info">
                <h4>{doctorService.doctor.name}</h4>
                <span>{doctorService.doctor.birthday}</span>
                <p>
                  Aut maiores voluptates amet et quis praesentium qui senda para
                </p>
                <div>
                        <button type="button"  className="btn btn-warning">
                            Đặt lịch
                        </button>
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
                    {" "}
                    <i class="ri-linkedin-box-fill"></i>{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
  ))}
                    {/* <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                        <div className="icon-box">
                            <div className="icon">
                                <i class="fas fa-pills"></i>
                            </div>
                            <h4>
                                <a className="">Sed ut perspiciatis</a>
                            </h4>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                        <div className="icon-box">
                            <div className="icon">
                                <i class="fas fa-hospital-user"></i>
                            </div>
                            <h4>
                                <a href="">Magni Dolores</a>
                            </h4>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                        <div className="icon-box">
                            <div className="icon">
                                <i class="fas fa-dna"></i>
                            </div>
                            <h4>
                                <a href="">Nemo Enim</a>
                            </h4>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                        <div className="icon-box">
                            <div className="icon">
                                <i class="fas fa-wheelchair"></i>
                            </div>
                            <h4>
                                <a href="">Dele cardo</a>
                            </h4>
                            <p>Quis consequatur saepe eligendi voluptatem consequatur dolor consequuntur</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                        <div className="icon-box">
                            <div className="icon">
                                <i class="fas fa-notes-medical"></i>
                            </div>
                            <h4>
                                <a href="">Divera don</a>
                            </h4>
                            <p>Modi nostrum vel laborum. Porro fugit error sit minus sapiente sit aspernatur</p>
                        </div>
                    </div>
                */}
                </div> 
            </div>
        </section>
    );
}
