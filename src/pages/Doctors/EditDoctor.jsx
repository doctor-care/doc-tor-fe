import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputInForm from '@/components/common/SelectOption/InputInForm';
import Option from '@/components/common/SelectOption/Option';
import ErrorMessage from '@/components/common/NotFound/ErrorMessage';
import { Link,useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/utils/firebase';

export default function EditDoctor(props) {
    const { doctor } = props;
    const yup = require('yup');
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [files, setFiles] = useState('');
    const [previewUrls, setPreviewUrls] = useState('');
    const [messageFile, setMessageFiles] = useState('');
    const navigate = useNavigate();
    const [checkEnable, setCheckEnable] = useState({
        city: '',
    });
    const schema = yup.object().shape({
        idDoctor: yup.string().required(),
        idAddress: yup.string().required(),
        avatarUrl: yup.string().required(),
        phone: yup
            .string()
            .required()
            .matches(/^([(0|(+84)])([79])([012])[0-9]{7,8}$/, 'phone sai định dạng'),
        name: yup.string().required(),
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
        sex: yup.string().required(),
        city: yup.string().required(),
        district: yup.string().required(),
        description: yup.string().required(),
    });
    useEffect(() => {
        if (checkEnable.city === '') return;
        axios.get(`https://vapi.vnappmob.com/api/province/district/${checkEnable.city}`).then((resp) => {
            setDistrict(resp.data.results);
        });
    }, [checkEnable.city]);

    const handleChangeCity = (e) => {
        setValue('city', e.target.value);
        setCheckEnable({ city: e.target.value });
    };

    const handleChangeDistrict = (e) => {
        setValue('district', e.target.value);
    };
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        Mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: doctor,
    });

    useMemo(() => {
        axios.get('https://vapi.vnappmob.com/api/province/').then((resp) => {
            setCity(resp.data.results);
            console.log("city",city);
        });

        axios.get(`https://vapi.vnappmob.com/api/province/district/${doctor.city}`).then((resp) => {
            setDistrict(resp.data.results);
        });
    }, []);

    const onSubmit = (data) => {
        if (previewUrls !== '') {
            const storageRef = ref(storage, `image`);
            const timestamp = Date.now();
            const fileName = `${timestamp}_${files.name}`;
            const fileRef = ref(storageRef, fileName);
            const uploadTask = uploadBytesResumable(fileRef, files);
            uploadTask.on(
                'state_changed',
                (snapshot) => {},
                (err) => {},
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        data.avatarUrl = url;
                        axios.post('http://localhost:8080/doctor/edit', data).then((resp) => navigate('/'));
                        return;
                    });
                },
            );
        }
        axios.post('http://localhost:8080/doctor/edit', data).then((resp) => navigate('/'));
    };

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
    useMemo(() => {
        axios.get('https://vapi.vnappmob.com/api/province/').then((resp) => {
            setCity(resp.data.results);
        });

        axios.get(`https://vapi.vnappmob.com/api/province/district/${doctor.city}`).then((resp) => {
            setDistrict(resp.data.results);
        });
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center w-screen mt-6">
        <div className="sm:px-0 px-4 md-screen">
            <div className="flex justify-center py-4">
                <Link to={'/'}>
                    <img src="/logo.png" alt="logo" className="w-56 h-20 object-cover" />
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input hidden name="idDoctor" {...register.idDoctor} />
                <input hidden name="idAddress" {...register.idAddress} />

                <InputInForm
                    label={'Name'}
                    properties={'name'}
                    register={register('name')}
                    error={errors?.name?.message}
                    type={'text'}
                />

                <InputInForm
                    label={'Address'}
                    properties={'address'}
                    register={register('address')}
                    error={errors?.address?.message}
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
                    label={'Description'}
                    properties={'description'}
                    register={register('description')}
                    error={errors?.description?.message}
                    type={'text'}
                />

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
                                <React.Fragment>
                                    <span>New Image</span>{' '}
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
                                </React.Fragment>
                            )}
                            {!previewUrls && (
                                <React.Fragment>
                                    <span>Old Image</span>{' '}
                                    <img
                                        key={previewUrls}
                                        src={doctor.avatarUrl}
                                        alt="Preview"
                                        style={{
                                            width: 'auto',
                                            height: '150px',
                                            margin: '5px',
                                        }}
                                    />
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                    <div>{messageFile && <ErrorMessage messageId={messageFile} />}</div>
                </div>

                <InputInForm
                    label={'Birthday'}
                    properties={'birthday'}
                    register={register('birthday')}
                    error={errors?.birthday?.message}
                    type={'date'}
                />

                <div className="formData">
                    <div>
                        <label>Gender</label>
                    </div>
                    <div>
                        <select className="form-control" {...register('sex')} name="sex">
                            <Option label={'sex'} list={['Nam', 'Nu', 'LBGT', 'Other']} />
                        </select>
                    </div>
                    <div>{errors?.sex && <ErrorMessage messageId={errors.sex.message} />}</div>
                </div>
                <div className="formData">
                    <div>
                        <label>City</label>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className="col-md-6 mr-4 ">
                            <div className="form-outline datepicker">
                                <select name="city" onChange={handleChangeCity}>
                                    {city.map((item) =>
                                        item.province_id === doctor.city ? (
                                            <option value={item.province_id} key={item.province_id} selected>
                                                {item.province_name}
                                            </option>
                                        ) : (
                                            <option value={item.province_id} key={item.province_id}>
                                                {item.province_name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        </div>

                        <React.Fragment>
                            <label>District</label>
                            <div className="col-md-6 mr-4" style={{ paddingLeft: '0.em' }}>
                                <select name="district" onChange={handleChangeDistrict} {...register('district')}>
                                    {district.map((item) =>
                                        item.district_id === doctor.district ? (
                                            <option value={item.district_id} key={item.district_id} selected>
                                                {item.district_name}
                                            </option>
                                        ) : (
                                            <option value={item.district_id} key={item.district_id}>
                                                {item.district_name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        </React.Fragment>
                    </div>
                    <div>{errors?.district && <ErrorMessage messageId={errors.district.message} />}</div>
                </div>

                <div className="flex flex-end my-4">
                        <div>
                            <button className="btn btn-success px-4" type="submit">
                               Cập nhật
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
