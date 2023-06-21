import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import './style.css';
import ErrorMessage from "@/components/common/NotFound/ErrorMessage";
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import Option from "@/components/common/SelectOption/Option";

export default function Patient() {
    const yup = require("yup");
    const navigate = useNavigate();

    const schema = yup.object({
        userName: yup.string().required(),
        password: yup.string().required(),
        email: yup.string().required()
            .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "mail sai định dạng"),
        avatarUrl: yup.string().required(),
        phone: yup.string().required()
            .matches(/^((090)[0-9]{7})|(84)[0-9]{8}$/, "phone sai định dạng"),
        birthday: yup.date().required()
            .max(new Date(), "ngay sinh khong qua hien tai")
            .test('dob', 'tuoi phai lon hon 18', function (value, ctx) {
                const dob = new Date(value);
                const validDate = new Date();
                const valid = validDate.getFullYear() - dob.getFullYear() >= 18;
                return !valid ? ctx.createError() : valid;
            }),
        address: yup.string().required(),
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
        const resp = await axios.post("http://localhost:8080/patient/signup", data);
        if (resp.status === HttpStatusCode.Created) { navigate("/"); }
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
                        <input className="form-control" {...register("password")} />
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
                        <input className="form-control" {...register("avatarUrl")} type="file" />
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
                        <input className="form-control" {...register("address")} />
                    </div>
                    <div>
                        {errors?.address && (
                            <ErrorMessage messageId={errors.address.message} />
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
