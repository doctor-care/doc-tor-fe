import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
// import './BookingSchedule.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
export default function CreatePrescription() {
    const { idHM } = useParams();
    const navigate = useNavigate();
    const [medicineList, setMedicineList] = useState([]);
    const [prescriptionList, setPrescriptionList] = useState([]);
    const [total, setTotal] = useState(0);
    const [valid, setValid] = useState({});
    const [prescriptionDetailDTOList, setPrescriptionDetailDTOList] = useState([]);

    const [newPrescription, setNewPrescription] = useState({
        idDrug: '',
        price: '',
        quantity: '',
        drugName: '',
    });

    const checkForm = Yup.object().shape({
        idDrug: Yup.string().required('Vui lòng chọn thuốc!'),
        quantity: Yup.string().required('Vui lòng nhập số lượng!'),
    });

    useEffect(() => {
        getDrugList();
        checkNullHistoryMedical();
    }, []);

    useEffect(() => {
        showTotal();
    }, [prescriptionList]);

    const checkNullHistoryMedical = () => {
        try {
            axios.get(`http://localhost:8080/history-medical/id/${idHM}`).then((response) => {
                console.log(response);
                if (response.data === null) {
                    navigate('/not-found');
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getDrugList = () => {
        try {
            axios.get('http://localhost:8080/drug/get-all').then((response) => {
                setMedicineList(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const convertCurrency = (price) => {
        var options = { style: 'decimal' }; // Định dạng theo kiểu số thập phân

        var formattedNumber = price.toLocaleString(undefined, options);
        return formattedNumber;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPrescription((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'drugName') {
            const selectedMedicine = medicineList.find((medicine) => medicine.idDrug === Number(value));
            if (selectedMedicine) {
                setNewPrescription((prevState) => ({
                    ...prevState,
                    price: selectedMedicine.price,
                    drugName: selectedMedicine.drugName,
                    idDrug: selectedMedicine.idDrug,
                }));
            }
        }
    };
    const showTotal = () => {
        var sum = 0;

        for (var i = 0; i < prescriptionList.length; i++) {
            sum += Number(prescriptionList[i].price) * Number(prescriptionList[i].quantity);
        }
        setTotal(sum);
        return sum;
    };

    const removePrescription = (idDrug) => {
        const newList = prescriptionList.filter((item) => item.idDrug !== idDrug);
        setPrescriptionList(newList);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        checkForm
            .validate(newPrescription, { abortEarly: false })
            .then(() => {
                setValid({});
                setPrescriptionList((prevList) => [...prevList, newPrescription]);
                setPrescriptionDetailDTOList((prevList) => [
                    ...prevList,
                    { idDrug: newPrescription.idDrug, quantity: newPrescription.quantity },
                ]);
                setNewPrescription({
                    idDrug: '',
                    price: '',
                    quantity: '',
                    drugName: '',
                });
            })
            .catch((validationErrors) => {
                const errors = {};
                validationErrors.inner.forEach((error) => {
                    errors[error.path] = error.message;
                });
                setValid(errors);
                toast.error('VUI LÒNG NHẬP THÔNG TIN!');
            });
    };

    const handleConfirm = () => {
        const prescriptionDTO = {
            idHM: idHM,
            createDate: Moment().format('YYYY-MM-DD'),
            totalPrice: total,
            prescriptionDetailDTOList: prescriptionDetailDTOList,
        };
        axios
            .post(`http://localhost:8080/prescription/create`, prescriptionDTO)
            .then((response) => {
                console.log('prescription response', response);
                if (response.data === 'FAIL') {
                } else {
                    toast.success('ĐÃ HOÀN TẤT LỊCH KHÁM');
                    navigate('/doctor/schedule-list');
                }
            })
            .catch((error) => {
                toast.error('THẤT BẠI');
                console.error(error);
            });
    };

    const cancelCreate = () => {
        toast.success('ĐÃ HOÀN TẤT');
        navigate('/doctor/schedule-list');
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <h2 className="text-uppercase">TẠO đơn thuốc</h2>
            </div>
            <div className="d-flex row">
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit} className="">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>TÊN THUỐC</th>
                                    <td>
                                        <select
                                            className="w-100 d-flex justify-content-end"
                                            name="drugName"
                                            value={newPrescription.idDrug}
                                            onChange={handleChange}
                                        >
                                            <option value={0}>Vui lòng chọn thuốc</option>
                                            {medicineList.map((drug) => (
                                                <option key={drug.idDrug} value={drug.idDrug}>
                                                    {drug.drugName}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>ĐƠN GIÁ</th>
                                    <td>{convertCurrency(newPrescription.price)}</td>
                                </tr>
                                <tr>
                                    <th>SỐ LƯỢNG</th>
                                    <td className="d-flex justify-content-between">
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            className="border w-50"
                                            value={newPrescription.quantity}
                                            onChange={handleChange}
                                        />

                                        <button disabled={false} type="submit" className="btn btn-success btn-sm">
                                            THÊM
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <div className="d-flex justify-content-center">
                    {prescriptionList.length > 0 && (
                        <div>
                            <div className="d-flex justify-content-center">
                                <h2>ĐƠN THUỐC</h2>
                            </div>
                            <table className="table table-bordered table-striped">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>TÊN THUỐC</th>
                                        <th>ĐƠN GIÁ</th>
                                        <th>SỐ LƯỢNG</th>
                                        <th>THÀNH TIỀN</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {prescriptionList.map((prescription, index) => (
                                        <tr key={index}>
                                            <td>{prescription.drugName}</td>
                                            <td>{prescription.price}</td>
                                            <td>{prescription.quantity}</td>
                                            <td className="d-flex justify-content-between">
                                                {convertCurrency(prescription.quantity * prescription.price)}{' '}
                                                <i
                                                    className="fa-solid fa-xmark text-danger"
                                                    onClick={() => removePrescription(prescription.idDrug)}
                                                ></i>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={2}>Đơn vị tính (VND)</td>
                                        <th>TỔNG TIỀN</th>

                                        <th>{convertCurrency(total)}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {prescriptionList.length === 0 && (
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-warning fw-bold text-white"
                            data-bs-toggle="modal"
                            data-bs-target="#notCreatePrescription"
                            disabled={false}
                        >
                            KHÔNG TẠO ĐƠN THUỐC
                        </button>
                    </div>
                )}

                {prescriptionList.length > 0 && (
                    <div className="d-flex justify-content-sm-center">
                        <button
                            className="btn btn-secondary mr-2"
                            onClick={() => {
                                setPrescriptionList([]);
                            }}
                        >
                            HỦY ĐƠN THUỐC
                        </button>

                        <button
                            className="btn btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            disabled={false}
                        >
                            HOÀN TẤT
                        </button>
                    </div>
                )}
            </div>
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white" id="staticBackdropLabel">
                                XÁC NHẬN
                            </h5>
                            <button
                                type="button"
                                className="btn-close text-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h5>XÁC NHẬN THÊM ĐƠN THUỐC NÀY?</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={handleConfirm}
                                data-bs-dismiss="modal"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="notCreatePrescription"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-warning">
                            <h5 className="modal-title text-white" id="staticBackdropLabel">
                                XÁC NHẬN
                            </h5>
                            <button
                                type="button"
                                className="btn-close text-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h5>Không tạo đơn thuốc cho bệnh án này?</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={cancelCreate}
                                data-bs-dismiss="modal"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
