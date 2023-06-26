import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import './style.css';
import ErrorMessage from "@/components/common/NotFound/ErrorMessage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Option from "@/components/common/SelectOption/Option";
import emailjs from '@emailjs/browser';
import randomOTP from "@/utils/randomOTP";
import InputInForm from "@/components/common/SelectOption/InputInForm";

export default function CreateDoctor() {
    const yup = require("yup");
    const navigate = useNavigate();
    const form = useRef();
    const schema = yup.object().shape({
        name: yup.string().required(),
        phone: yup.string().required()
            .matches(/^([(0|(+84)])(9)([012])[0-9]{7,8}$/, "phone sai định dạng"),
        sex: yup.string().required(),
        otp: yup.string().required(),
        address: yup.string().required(),
        avatarUrl: yup.string().required(),
        averageRate: yup.string().required(),
        birthday: yup.string().required(),
        idSPL: yup.string().required(),
        email: yup.string().required(),
        userName: yup.string().required(),
        password: yup.string().required(),
        degree: yup.string().required(),
        description: yup.string().required()
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

    const onSubmit = data => {
    }
    return (
        <div>
            <h1>Form Doctor</h1>
            <form onSubmit={handleSubmit(onSubmit)} ref={form}>
                <InputInForm
                    label={"Name"}
                    properties={"name"}
                    register={register("name")}
                    error={errors?.name?.message}
                    type={"text"} />

                <InputInForm
                    label={"Phone"}
                    properties={"phone"}
                    register={register("phone")}
                    error={errors?.phone?.message}
                    type={"text"} />

                <input name="otp" hidden  {...register("otp")} defaultValue={randomOTP()} />

                <div className="formData">
                    <div>
                        <label>Gender</label>
                    </div>
                    <div>
                        <select className="form-control"  {...register("sex")} defaultValue="" name="sex">
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

                <InputInForm
                    label={"Address"}
                    properties={"address"}
                    register={register("address")}
                    error={errors?.address?.message}
                    type={"text"} />

                <InputInForm
                    label={"idSPL"}
                    properties={"idSPL"}
                    register={register("idSPL")}
                    error={errors?.idSPL?.message}
                    type={"text"} />

                <InputInForm
                    label={"Average Rate"}
                    properties={"averageRate"}
                    register={register("averageRate")}
                    error={errors?.averageRate?.message}
                    type={"text"} />

                <InputInForm
                    label={"Birthday"}
                    properties={"birthday"}
                    register={register("birthday")}
                    error={errors?.birthday?.message}
                    type={"date"} />

                <InputInForm
                    label={"SQL"}
                    properties={"idSQL"}
                    register={register("idSQL")}
                    error={errors?.idSQL?.message}
                    type={"text"} />

                <InputInForm
                    label={"Email"}
                    properties={"email"}
                    register={register("email")}
                    error={errors?.email?.message}
                    type={"text"} />

                <InputInForm
                    label={"degree"}
                    properties={"degree"}
                    register={register("degree")}
                    error={errors?.degree?.message}
                    type={"text"} />

                <InputInForm
                    label={"UserName"}
                    properties={"userName"}
                    register={register("userName")}
                    error={errors?.userName?.message}
                    type={"text"} />

                <InputInForm
                    label={"Password"}
                    properties={"password"}
                    register={register("password")}
                    error={errors?.password?.message}
                    type={"password"} />


                <div className="formData">
                    <div>
                        <label>Description</label>
                    </div>
                    <div>
                        <textarea {...register("description")} className="form-control">
                        </textarea>
                    </div>
                    <div>
                        {errors.description && (
                            <ErrorMessage messageId={errors.description.message} />
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
