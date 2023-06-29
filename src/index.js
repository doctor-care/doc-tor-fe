import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyles from './components/GlobalStyle';

import "./assets/css/style.css";
import "./assets/vendor/fontawesome-free/css/all.min.css";
import "./assets/vendor/animate.css/animate.min.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/glightbox/css/glightbox.min.css";
import "./assets/vendor/remixicon/remixicon.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import { ToastContainer, toast } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
const toastConfig = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
};
const title = process.env.REACT_APP_TITLE;
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <App />
            <ToastContainer {...toastConfig} />
        </GlobalStyles>
    </React.StrictMode>,
);

document.title = title;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
