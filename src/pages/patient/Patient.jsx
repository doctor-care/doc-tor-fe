import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import './style.css';
import ErrorMessage from '@/components/common/NotFound/ErrorMessage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Option from '@/components/common/SelectOption/Option';
import emailjs from '@emailjs/browser';
import randomOTP from '@/utils/randomOTP';
import InputInForm from '@/components/common/SelectOption/InputInForm';

export default function Patient() {
    const yup = require('yup');
    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [messageAddress, setMessageAddress] = useState('');
    const [messageFile, setMessageFiles] = useState('');
    const [files, setFiles] = useState('');
    const [previewUrls, setPreviewUrls] = useState('');
    const form = useRef();
    const [checkEnable, setCheckEnable] = useState({
        city: '0',
        district: '0',
    });

    const schema = yup.object().shape({
        userName: yup
            .string()
            .required()
            .test('userName', 'Username already in use', function (value) {
                if (value === '') return true;
                return new Promise((resolve, reject) => {
                    axios
                        .get(`http://localhost:8080/valid/username/${value}`)
                        .then((res) => {
                            console.log(`http://localhost:8080/valid/username/${value}`);
                            resolve(true);
                        })
                        .catch((error) => {
                            if (error.response.status === 400) {
                                resolve(false);
                            }
                        });
                });
            }),
        password: yup.string().required().min(6).max(25),
        email: yup
            .string()
            .required()
            .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Mail sai định dạng')
            .test('email', 'Email already in use', function (value) {
                if (value === '') return true;
                return new Promise((resolve, reject) => {
                    axios
                        .get(`http://localhost:8080/valid/email/${value}`)
                        .then((res) => {
                            resolve(true);
                        })
                        .catch((error) => {
                            if (error.response.status === 400) {
                                resolve(false);
                            }
                        });
                });
            }),
        phone: yup
            .string()
            .required()
            .matches(/^([(0|(+84)])([79])([012])[0-9]{7,8}$/, 'phone sai định dạng'),
        birthday: yup
            .string()
            .required()
            .test('dob', 'tuổi phải trên 18', function (value, ctx) {
                const dob = new Date(value);
                const validDate = new Date();
                const valid = validDate.getFullYear() - dob.getFullYear() >= 18;
                return !valid ? ctx.createError() : valid;
            }),
        address: yup.string().required(),
        otp: yup.string().required(),
        name: yup.string().required(),
        healthHistory: yup.string().required(),
        bloodType: yup.string().required(),
        sex: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        Mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log('data thienduy', data.email.toString().split('@')[0]);
        if (checkEnable.city === '0' && checkEnable.district === '0') {
            setMessageAddress('dia chi khong duoc de trong');
            return;
        }
        if (checkEnable.city !== '0' && checkEnable.district !== '0') {
            data.city = checkEnable.city;
            data.district = checkEnable.district;
            data.avatarUrl = files;
            data.url = 'http://localhost:8080/patient/signup';
            emailjs.sendForm('service_gu18tah', 'template_eomflh8', form.current, 'nGzNvmaDuhf2VKbq8').then(
                (result) => {
                    navigate('/otp', {
                        state: {
                            data: data,
                        },
                    });
                },
                (error) => {
                    console.log(error.text);
                },
            );
            // axios
            //     .post('http://localhost:8080/send-otp', data.email.toString().split('@')[0])
            //     .then((resp) => {
            //         console.log('mail response', resp);
            //         navigate('/otp', {
            //             state: {
            //                 data: data,
            //             },
            //         });
            //     })
            //     .catch((error) => {
            //         console.log('error mail', error);
            //     });
        }
    };

    const handleChangeCity = (e) => {
        setCheckEnable({ ...checkEnable, city: e.target.value });
    };

    const handleChangeDistrict = (e) => {
        setCheckEnable({ ...checkEnable, district: e.target.value });
    };

    useEffect(() => {
        axios.get('https://vapi.vnappmob.com/api/province/').then((resp) => {
            setCity(resp.data.results);
        });
    }, [messageAddress]);

    useEffect(() => {
        axios
            .get(`https://vapi.vnappmob.com/api/province/district/${checkEnable.city}`)
            .then((resp) => setDistrict(resp.data.results));
    }, [checkEnable.city]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        let imageFiles = [];
        let urls = '';
        let isImage = true;
        if (selectedFiles[0].size < 1000000) {
            setMessageFiles('');
            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => {
                    const fileExtension = file.name.split('.').pop();
                    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                    if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                        imageFiles = file;
                        urls = URL.createObjectURL(file);
                    } else {
                        isImage = false;
                    }
                });
                if (isImage) {
                    setFiles(imageFiles);
                    setPreviewUrls(urls);
                }
            }
            return;
        }
        setMessageFiles('file to big');
    };

    return (
        <div>
            <h1>Form Patient</h1>
            <form onSubmit={handleSubmit(onSubmit)} ref={form}>
                <InputInForm
                    label={'Username'}
                    properties={'userName'}
                    register={register('userName')}
                    error={errors?.userName?.message}
                    type={'text'}
                />
                <InputInForm
                    label={'Password'}
                    properties={'password'}
                    register={register('password')}
                    error={errors?.password?.message}
                    type={'password'}
                />
                <input name="otp" hidden {...register('otp')} defaultValue={randomOTP()} />
                <div className="formData">
                    <div>
                        <label>avatarUrl</label>
                    </div>
                    <div>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                            accept="image/jpeg, image/png, image/jpg"
                        />
                        <div>
                            {previewUrls && (
                                <img
                                    key={previewUrls}
                                    src={previewUrls}
                                    alt="Preview"
                                    style={{
                                        width: 'auto',
                                        height: '150px',
                                        margin: '5px',
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div>{messageFile && <ErrorMessage messageId={messageFile} />}</div>
                </div>

                <InputInForm
                    label={'Email'}
                    properties={'email'}
                    register={register('email')}
                    error={errors?.email?.message}
                    type={'text'}
                />

                <InputInForm
                    label={'Phone'}
                    properties={'phone'}
                    register={register('phone')}
                    error={errors?.phone?.message}
                    type={'text'}
                />

                <InputInForm
                    label={'Birthday'}
                    properties={'birthday'}
                    register={register('birthday')}
                    error={errors?.birthday?.message}
                    type={'date'}
                />

                <InputInForm
                    label={'Address'}
                    properties={'address'}
                    register={register('address')}
                    error={errors?.address?.message}
                    type={'text'}
                />

                <div className="formData">
                    <div>
                        <label>City</label>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className="col-md-6 mr-4 ">
                            <div className="form-outline datepicker">
                                <select name="city" defaultValue="0" onChange={handleChangeCity}>
                                    <option value="0">-Choice something-</option>
                                    {city.map((item) => (
                                        <option value={item.province_id} key={item.province_id}>
                                            {item.province_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {checkEnable.city !== '0' && (
                            <React.Fragment>
                                <label>District</label>
                                <div className="col-md-6 mr-4" style={{ paddingLeft: '0.em' }}>
                                    <select name="district" defaultValue="0" onChange={handleChangeDistrict}>
                                        <option value="0">-Choice something-</option>
                                        {district.map((item) => (
                                            <option value={item.district_id} key={item.district_id}>
                                                {item.district_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                    <div>{messageAddress !== '' && <ErrorMessage messageId={messageAddress} />}</div>
                </div>
                <InputInForm
                    label={'Name'}
                    properties={'name'}
                    register={register('name')}
                    error={errors?.name?.message}
                    type={'text'}
                />

                <InputInForm
                    label={'Health History'}
                    properties={'healthHistory'}
                    register={register('healthHistory')}
                    error={errors?.healthHistory?.message}
                    type={'text'}
                />

                <div className="formData">
                    <div>
                        <label>Blood Type</label>
                    </div>
                    <div>
                        <select className="form-control" {...register('bloodType')} defaultValue="" name="bloodType">
                            <Option label={'Blood Type'} list={['A', 'B', 'AB', 'O', 'Other']} />
                        </select>
                    </div>
                    <div>{errors?.bloodType && <ErrorMessage messageId={errors.bloodType.message} />}</div>
                </div>
                <div className="formData">
                    <div>
                        <label>Gender</label>
                    </div>
                    <div>
                        <select className="form-control" {...register('sex')} defaultValue="" name="sex">
                            <Option label={'sex'} list={['Nam', 'Nu', 'LBGT', 'Other']} />
                        </select>
                    </div>
                    <div>{errors?.sex && <ErrorMessage messageId={errors.sex.message} />}</div>
                </div>
                <div className="formData">
                    <div>
                        <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>
                            Back List
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-success" type="submit">
                            Submit
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={() => reset(schema)} className="btn btn-warning">
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
