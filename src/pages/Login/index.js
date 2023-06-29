import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
function Login() {
    const [error, setErr] = useState();
    const [view, setView] = useState(false);
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    // console.log("TEST ROLE", localStorage.getItem('test') === '');

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const apiUrl = 'http://localhost:8080/user/login';
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
            };
            const requestData = {
                userName: values.username,
                password: values.password,
            };
            axios
                .post(apiUrl, requestData, { headers })
                .then((res) => {
                    localStorage.setItem('accessToken', res.data.jwt);
                    localStorage.setItem('userName', jwtDecode(res.data.jwt).sub);
                    localStorage.setItem('role', jwtDecode(res.data.jwt).aud);
                    const encodedPayload = res.data.jwt.split('.')[1];
                    // const decodedPayload = JSON.parse(atob(encodedPayload));
                    console.log('encodedPayload', encodedPayload);
                    // const username = decodedPayload.username; const userrole = decodedPayload.userrole;
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                    setErr('Sai tên đăng nhập hoặc mật khẩu!');
                });
            // Xử lý response từ API  console.log(response.data);
        },
    });

    const { touched } = formik;
    const handleInputChange = (event) => {
        formik.handleChange(event);
        setErr('');
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

                <p className="mt-4 text-danger" style={{ height: '1.5rem' }}>
                    {error}
                </p>
            </div>

            <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email" className="sr-only">
                        userName
                    </label>

                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            className=" border w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
                            placeholder="Enter username"
                            value={formik.values.username}
                            onChange={handleInputChange}
                        />
                        {formik.errors.username && touched.username && (
                            <div className="text-danger">{formik.errors.username}</div>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type={view ? 'text' : 'password'}
                            name="password"
                            className=" border w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
                            placeholder="Enter password"
                            value={formik.values.password}
                            onChange={handleInputChange}
                        />
                        {formik.errors.password && touched.username && (
                            <div className="text-danger">{formik.errors.password}</div>
                        )}
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-400">
                            <i
                                className={view ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}
                                onClick={() => {
                                    setView(!view);
                                }}
                            ></i>
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        No account?
                        <a className="underline" href="">
                            Sign up
                        </a>
                    </p>

                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
