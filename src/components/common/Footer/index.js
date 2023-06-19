import React, { useContext, useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email submitted: ${email}`);
        // Do something with the email, such as sending it to a server
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h3>Medilab</h3>
                            <p>
                                A108 Adam Street <br />
                                New York, NY 535022
                                <br />
                                United States <br />
                                <br />
                                <strong>Phone:</strong> +1 5589 55488 55
                                <br />
                                <strong>Email:</strong> info@example.com
                                <br />
                            </p>
                        </div>
                        <div className="col-lg-2 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">Home</a>
                                </li>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">About us</a>
                                </li>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">Services</a>
                                </li>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a>
                                </li>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">Web Design</a>
                                </li>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">Web Development</a>
                                </li>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">Product Management</a>
                                </li>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">Marketing</a>
                                </li>
                                <li>
                                    <i class="bx bx-chevron-right"></i> <a href="#">Graphic Design</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 footer-newsletter">
                            <h4>Join Our Newsletter</h4>
                            <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                            <form onSubmit={handleSubmit}>
                                <input type="email" value={email} onChange={handleEmailChange} />
                                <input type="submit" value="Subscribe" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-md-flex py-4">
                <div className="me-md-auto text-center text-md-start">
                    <div className="copyright">
                        &copy; Copyright{' '}
                        <strong>
                            <span>Medilab</span>
                        </strong>
                        . All Rights Reserved
                    </div>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </div>
                <div class="social-links text-center text-md-right pt-3 pt-md-0">
                    <a href="#" className="twitter">
                        <i class="bx bxl-twitter"></i>
                    </a>
                    <a href="#" className="facebook">
                        <i class="bx bxl-facebook"></i>
                    </a>
                    <a href="#" className="instagram">
                        <i class="bx bxl-instagram"></i>
                    </a>
                    <a href="#" className="google-plus">
                        <i class="bx bxl-skype"></i>
                    </a>
                    <a href="#" className="linkedin">
                        <i class="bx bxl-linkedin"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
