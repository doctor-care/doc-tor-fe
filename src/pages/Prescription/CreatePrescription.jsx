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

    const [prescriptionDetailDTOList, setPrescriptionDetailDTOList] = useState([]);

    const [newPrescription, setNewPrescription] = useState({
        idDrug: '',
        price: '',
        quantity: '',
        drugName: '',
    });

    useEffect(() => {
        getDrugList();
    }, []);

    console.log('idHM', idHM);

    useEffect(() => {
        showTotal();
    }, [prescriptionList.length]);

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
        setPrescriptionList((prevList) => [...prevList, newPrescription]);
        setPrescriptionDetailDTOList((prevList) => [
            ...prevList,
            { idDrug: newPrescription.idDrug, quantity: newPrescription.quantity },
        ]);
        // console.log('prescriptionDetailDTOList', prescriptionDetailDTOList);
        // console.log(newPrescription);
        setNewPrescription({
            idDrug: '',
            price: '',
            quantity: '',
            drugName: '',
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
                    toast.success('ĐÃ HOÀN TẤT');
                    navigate('/doctor/schedule-list');
                }
            })
            .catch((error) => {
                toast.error('THẤT BẠI');
                console.error(error);
            });
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <h2 className="text-uppercase">Thêm đơn thuốc</h2>
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
                                            <option value={0}>Vui lòng chọn</option>
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
                                            className="w-50"
                                            value={newPrescription.quantity}
                                            onChange={handleChange}
                                        />
                                        <button disabled={false} type="submit" className="btn btn-success btn-sm">
                                            THÊM
                                            {/* <i class="fa-solid fa-plus"></i> */}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* 
                        <div>
                            <button disabled={false} type="submit" className="btn btn-primary">
                                THÊM
                            </button>
                        </div> */}
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
                                                    class="fa-solid fa-xmark text-danger"
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
                {prescriptionList.length > 0 && (
                    <div className="d-flex justify-content-sm-center">
                        <button
                            className="btn btn-primary btn-sm"
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
                        <div className="modal-header bg-danger">
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
                                <h5>Bạn thực sự muốn xác nhận lịch hẹn này?</h5>
                                {/* <span>
                                    - Mã vé: <strong>{maVeDelete}</strong>
                                </span> */}
                                <br></br>
                                {/* <span>
                                    - Hành khách: <strong>{tenHanhKhachDelete}</strong>
                                </span> */}
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
        </div>
    );
}
