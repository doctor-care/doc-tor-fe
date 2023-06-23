import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase";
import './style.css';
import ErrorMessage from "@/components/common/NotFound/ErrorMessage";
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import Option from "@/components/common/SelectOption/Option";
import UploadFirebase from "@/utils/upload/UploadFirebase";

export default function Patient() {
    const yup = require("yup");
    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    const [messageAddress, setMessageAddress] = useState("");
    const [files, setFiles] = useState("");
    const [previewUrls, setPreviewUrls] = useState("");
    const [district, setDistrict] = useState([]);
    const [checkEnable, setCheckEnable] = useState({
        city: "0",
        district: "0",
    });

    const schema = yup.object({
        userName: yup.string().required(),
        password: yup.string().required(),
        address: yup.string().required(),
        email: yup.string().required()
            .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "mail sai định dạng"),
        avatarUrl: yup.mixed().required('File is required'),
        phone: yup.string().required()
            .matches(/^((090)[0-9]{7})|(84)[0-9]{8}$/, "phone sai định dạng"),
        birthday: yup
            .string()
            .required()
            .test('dob', 'tuoi phai lon hon 18', function (value, ctx) {
                const dob = new Date(value);
                const validDate = new Date();
                const valid = validDate.getFullYear() - dob.getFullYear() >= 18;
                return !valid ? ctx.createError() : valid;
            }),
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
        Mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        if (checkEnable.city === '0' && checkEnable.district === "0") { setMessageAddress("dia chi khong duoc de trong"); return }
        if (files === null) { setMessageAddress("dia chi khong duoc de trong"); return }
        if (checkEnable.city !== '0' && checkEnable.district !== "0") {
            const folderRef = ref(storage, "image");
            if (files !== "") {
                const timestamp = Date.now();
                const fileName = `${timestamp}_${files.name}`;
                const fileRef = ref(folderRef, fileName);
                const uploadTask = uploadBytesResumable(fileRef, files);
                uploadTask.on("state_changed",
                    (snapshot) => {
                        console.log(snapshot);
                    },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            data.avatarUrl = downloadURL;
                            data.city = checkEnable.city;
                            data.district = checkEnable.district;
                            axios.post("http://localhost:8080/patient/signup", data).then(resp => {
                                if (resp.status == HttpStatusCode.Created) {
                                    navigate("/");
                                }
                            })
                            return;
                        });
                    })
            }
        }else{
            setMessage("address khong de trong");
        }
    };

    useEffect(() => {
        axios.get("https://vapi.vnappmob.com/api/province/").then((resp) => {
            setCity(resp.data.results);
        });
    }, [messageAddress]);

    const handleChangeCity = (e) => {
        setCheckEnable({ ...checkEnable, city: e.target.value });
    };

    const handleChangeDistrict = (e) => {
        setCheckEnable({ ...checkEnable, district: e.target.value });
    };
    
    useEffect(() => {
        getData();
    }, [checkEnable.city]);

    const getData = async () => {
        let resp = await axios.get(
            `https://vapi.vnappmob.com/api/province/district/${checkEnable.city}`
        );
        setDistrict(resp.data.results);
    };
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        let imageFiles = [];
        let urls = "";
        let isImage = true;

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
    };
    return (
        <div>
            <h1>Form Patient</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formData">
                    <div>
                        <label>Username</label>
                    </div>
                    <div>
                        <input className="form-control" {...register("userName")} />
                    </div>
                    <div>
                        {errors?.userName &&
                            <ErrorMessage messageId={errors.userName.message} />
                        }
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <label>Password</label>
                    </div>
                    <div>
                        <input className="form-control" {...register("password")} type="password" />
                    </div>
                    <div>
                        {errors.password &&
                            <ErrorMessage messageId={errors.password.message} />
                        }
                    </div>
                </div>

                <div className="formData">
                    <div>
                        <label>avatarUrl</label>
                    </div>
                    <div>
                        <input
                            type="file"
                            className="form-control"
                            {...register("avatarUrl")}
                            multiple
                            onChange={handleFileChange}
                            accept="image/jpeg, image/png, image/jpg"
                        />
                        <div>
                            {previewUrls && <img
                                key={previewUrls}
                                src={previewUrls}
                                alt="Preview"
                                style={{
                                    width: "auto",
                                    height: "150px",
                                    margin: "5px",
                                }}
                            />}
                        </div>
                        <div>
                       
                    </div>
                    </div>
                    <div>
                        {errors.avatarUrl &&
                            <ErrorMessage messageId={errors.avatarUrl.message} />
                        }
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <label>Email</label>
                    </div>
                    <div>
                        <input className="form-control" {...register("email")} />
                    </div>
                    <div>
                        {errors?.email && (
                            <ErrorMessage messageId={errors.email.message} />
                        )}
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <label>Phone</label>
                    </div>
                    <div>
                        <input className="form-control" {...register("phone")} />
                    </div>
                    <div>
                        {errors?.phone && (
                            <ErrorMessage messageId={errors.phone.message} />
                        )}
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <label>Birthday</label>
                    </div>
                    <div>
                        <input className="form-control" type="date" {...register("birthday")} />
                    </div>
                    <div>
                        {errors?.birthday && (
                            <ErrorMessage messageId={errors.birthday.message} />
                        )}
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <label>Address</label>
                    </div>
                    <div>
                        <input className="form-control" {...register("address")} type="text" />
                    </div>
                    <div>
                        {errors.address &&
                            <ErrorMessage messageId={errors.address.message} />
                        }
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
                                    defaultValue="0"
                                    onChange={handleChangeCity}
                                >
                                    <option value="0">-Choice something-</option>
                                    {city.map((item) => (
                                        <option value={item.province_id} key={item.province_id}>
                                            {item.province_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {checkEnable.city !== "0" && (
                            <React.Fragment>
                                <label>District</label>
                                <div className="col-md-6 mr-4" style={{ paddingLeft: "0.1em" }}>
                                    <select
                                        name="district"
                                        defaultValue="0"
                                        onChange={handleChangeDistrict}
                                    >
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
                        <label>Name</label>
                    </div>
                    <div>
                        <input className="form-control" {...register("name")} />
                    </div>
                    <div>
                        {errors?.name && (
                            <ErrorMessage
                                messageId={errors.name.message}
                            />
                        )}
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <label>Health History</label>
                    </div>
                    <div>
                        <input className="form-control"  {...register("healthHistory")} />
                    </div>
                    <div>
                        {errors?.healthHistory && (
                            <ErrorMessage
                                messageId={errors.healthHistory.message}
                            />
                        )}
                    </div>
                </div>
                <div className="formData">
                    <div>
                        <label>Blood Type</label>
                    </div>
                    <div>
                        <select className="form-control"  {...register("bloodType")} defaultValue="">
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
                <div className="formData">
                    <div>
                        <label>Gender</label>
                    </div>
                    <div>
                        <select className="form-control"  {...register("sex")} defaultValue="">
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
                    <div> <button className="btn btn-secondary" type="button" onClick={() => navigate("/")}>
                        Back List
                    </button></div>
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
    )
}
