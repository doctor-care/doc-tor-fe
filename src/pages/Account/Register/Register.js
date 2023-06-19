import React, { useState } from "react";
import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function RegisterPatientPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    address: "",
    sex: "",
    healthHistory: "",
    password: "",
    confirmPassword: "",
    account: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send registration request to server
    console.log(formData);
  };
  const [passwordHidden, setPasswordHidden] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordHidden(!passwordHidden);
  };

  return (
    <div className="register-patient-page">
      <form className="form" onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="left-column">
            <label>
              <span>
                <span className="bb">*</span>
                <span>Full name:</span>
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span>
                <span className="bb">*</span>
                <span>Email:</span>
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span>
                <span className="bb">*</span>
                <span>Account:</span>
              </span>
              <input
                type="text"
                name="account"
                value={formData.account}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span>
                <span className="bb">*</span>
                <span>Phone number:</span>
              </span>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span>Date of birth:</span>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span>
                <span className="bb">*</span>
                <span>Address:</span>
              </span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="right-column">
            <label>
              <span>Gender:</span>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              <span>
                <span className="bb">*</span>
                <span>Password:</span>
              </span>
              <div className="form-group-r">
                <input
                  type={passwordHidden ? "password" : "text"}
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
                <div id="eye" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={passwordHidden ? faEyeSlash : faEye} />
                </div>
              </div>
            </label>
            <label>
              <span>
                <span className="bb">*</span>
                <span>Confirm password:</span>
              </span>
              <div className="form-group-r">
                <input
                  type={passwordHidden ? "password" : "text"}
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
                <div id="eye" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={passwordHidden ? faEyeSlash : faEye} />
                </div>
              </div>
            </label>
            <label>
              <span>Blood type:</span>
              <input
                type="text"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span>Medical history:</span>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </section>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPatientPage;
