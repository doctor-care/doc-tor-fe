import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import InputInForm from '@/components/common/SelectOption/InputInForm';
import './style.css';
import ErrorMessage from "@/components/common/NotFound/ErrorMessage";
import Option from '@/components/common/SelectOption/Option';
import { useNavigate } from 'react-router-dom';

export default function EditPatient(props) {
    const { patient } = props;
    const [city, setCity] = useState([]);
    const [renderDistrict, setRenderDistrict] = useState(true);
    const [district, setDistrict] = useState([]);
    const [messageAddress, setMessageAddress] = useState("");
    const [files, setFiles] = useState("");
    const [previewUrls, setPreviewUrls] = useState("");
    const form = useRef();
    const [messageFile, setMessageFiles] = useState("");
    const navigate = useNavigate();
    const yup = require("yup");
    const schema = yup.object().shape({
        phone: yup.string().required()
            .matches(/^([(0|(+84)])([79])([012])[0-9]{7,8}$/, "phone sai định dạng"),
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
        avatarUrl: yup.string().required(),
        idPatient: yup.string().required(),
        name: yup.string().required(),
        healthHistory: yup.string().required(),
        bloodType: yup.string().required(),
        sex: yup.string().required(),
        city: yup.string().required(),
        district: yup.string().required()
    });

    useMemo(() => {
        axios.get(
            "https://vapi.vnappmob.com/api/province/"
        ).then((resp) => {
            setCity(resp.data.results);
        });

        axios.get(
            `https://vapi.vnappmob.com/api/province/district/${patient.city}`
        ).then(resp => {
            setDistrict(resp.data.results);
        });

    }, []);



    const onSubmit = data => {
        console.log(data);
    }
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        let imageFiles = [];
        let urls = "";
        let isImage = true;
        if (selectedFiles[0].size < 1000000) {
            setMessageFiles("");
            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => {
                    const fileExtension = file.name.split(".").pop();
                    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
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
        setMessageFiles("file to big");
    };

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        Mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: patient
    });

    return (
        <div>
            <h1>Form edit Patient</h1>
            <form onSubmit={handleSubmit(onSubmit)} ref={form}>
                <input hidden name='idPatient' />
                <InputInForm
                    label={"Name"}
                    properties={"name"}
                    register={register("name")}
                    error={errors?.name?.message}
                    type={"text"} />

                <InputInForm
                    label={"Address"}
                    properties={"address"}
                    register={register("address")}
                    error={errors?.address?.message}
                    type={"text"} />

                <InputInForm
                    label={"Phone"}
                    properties={"phone"}
                    register={register("phone")}
                    error={errors?.phone?.message}
                    type={"text"} />

                <InputInForm
                    label={"healthHistory"}
                    properties={"healthHistory"}
                    register={register("healthHistory")}
                    error={errors?.healthHistory?.message}
                    type={"text"} />
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
                            {previewUrls && <React.Fragment><span>New Image</span> <img
                                key={previewUrls}
                                src={previewUrls}
                                alt="Preview"
                                style={{
                                    width: "auto",
                                    height: "150px",
                                    margin: "5px",
                                }}
                            /></React.Fragment>}
                            {!previewUrls && <React.Fragment><span>Old Image</span> <img
                                key={previewUrls}
                                src={patient.avatarUrl}
                                alt="Preview"
                                style={{
                                    width: "auto",
                                    height: "150px",
                                    margin: "5px",
                                }}
                            /></React.Fragment>}
                        </div>
                    </div>
                    <div>
                        {messageFile &&
                            <ErrorMessage messageId={messageFile} />
                        }
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <label>Blood Type</label>
                    </div>
                    <div>
                        <select className="form-control"  {...register("bloodType")} name="bloodType">
                            <Option label={"Blood Type"} list={["A", "B", "AB", "O", "Other"]} />
                        </select>
                    </div>
                    <div>
                        {errors?.bloodType && (
                            <ErrorMessage
                                messageId={errors.bloodType.message}
                            />
                        )}
                    </div>
                </div>

                <InputInForm
                    label={"Birthday"}
                    properties={"birthday"}
                    register={register("birthday")}
                    error={errors?.birthday?.message}
                    type={"date"} />
                <div className="formData">
                    <div>
                        <label>Gender</label>
                    </div>
                    <div>
                        <select className="form-control"  {...register("sex")} name="sex">
                            <Option label={"sex"} list={["Nam", "Nu", "LBGT", "Other"]} />
                        </select>
                    </div>
                    <div>
                        {errors?.sex && (
                            <ErrorMessage
                                messageId={errors.sex.message}
                            />
                        )}
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <label>City</label>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="col-md-6 mr-4 ">
                            <div className="form-outline datepicker">
                                <select
                                    name="city"
                                    {...register("city")}
                                >
                                    {city.map((item) => (item.province_id === patient.city ?
                                        <option value={item.province_id}
                                            key={item.province_id}
                                            onChange={() => {
                                                setValue("city", item.province_id);
                                                setRenderDistrict(!renderDistrict)
                                            }}
                                            selected>
                                            {item.province_name}
                                        </option> :
                                        <option value={item.province_id}
                                            key={item.province_id}
                                            onChange={() => {
                                                setValue("city", item.province_id);
                                                setRenderDistrict(!renderDistrict)
                                            }}>
                                            {item.province_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <React.Fragment>
                            <label>District</label>
                            <div className="col-md-6 mr-4" style={{ paddingLeft: "0.em" }}>
                                <select
                                    name="district"
                                    {...register("district")}
                                >
                                    {district.map((item) => (item.district_id === patient.district ?
                                        <option value={item.district_id}
                                            key={item.district_id}
                                            onChange={() => setValue("district", item.district_id)}
                                            selected>
                                            {item.district_name}
                                        </option> :
                                        <option
                                            value={item.district_id}
                                            key={item.district_id}
                                            onChange={() => setValue("district", item.district_id)}>
                                            {item.district_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </React.Fragment>

                    </div>
                    <div>
                        {messageAddress !== '' && (
                            <ErrorMessage
                                messageId={messageAddress}
                            />
                        )}
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <button className="btn btn-secondary" type="button" onClick={() => navigate("/")}>
                            Back List
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-success" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}