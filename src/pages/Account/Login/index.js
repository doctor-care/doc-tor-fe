import './Login.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
export default function Login() {
    const [passwordHidden, setPasswordHidden] = useState(true);
    const togglePasswordVisibility = () => {
        setPasswordHidden(!passwordHidden);
    };

    return (
        <div id="wrapper">
            <form action="" id="form-login">
                <h1 className="form-heading">Login</h1>
                <label>Email</label>
                <div className="form-group">
                    <i className="far fa-user"></i>
                    <input type="text" className="form-input" placeholder="exemple@gmail.com" />
                </div>
                <label>Password</label>
                <div className="form-group">
                    <i className="fas fa-key"></i>
                    <input type={passwordHidden ? 'password' : 'text'} className="form-input" placeholder="Password" />
                    <div id="eye" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={passwordHidden ? faEye : faEyeSlash} />
                    </div>
                </div>
                <div className="forgot-password">
                    <a href="#" className="forgot-password">
                        Forgot password?
                    </a>
                </div>

                <input type="submit" value="Submit" className="form-submit" />
                <div className="">
                    <p className="register">
                        No account?{' '}
                        <a href="#" className="register-link">
                            Register
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}
