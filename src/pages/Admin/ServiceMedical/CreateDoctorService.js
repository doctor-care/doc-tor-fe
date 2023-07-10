import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
// import './BookingSchedule.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
export default function CreateDoctorService() {
    const { idHM } = useParams();
    const navigate = useNavigate();
    const [medicineList, setMedicineList] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [doctorSelected, setDoctorSelected] = useState('');
    const [doctorSelected2, setDoctorSelected2] = useState({});
    const [prescriptionList, setPrescriptionList] = useState([]);
    const [prescriptionListId, setPrescriptionListId] = useState([]);
    const [total, setTotal] = useState(0);
    const [valid, setValid] = useState({});
    const [prescriptionDetailDTOList, setPrescriptionDetailDTOList] = useState([]);

    const [newPrescription, setNewPrescription] = useState({
        idService: '',
        priceService: '',
        nameService: '',
    });

    const checkForm = Yup.object().shape({
        idService: Yup.string().required('Vui lòng chọn dịch vụ!'),
    });

    useEffect(() => {
        getDrugList();
        getDoctor();
    }, []);

    // useEffect(() => {
    //     showTotal();
    // }, [prescriptionList]);

    // const checkNullHistoryMedical = () => {
    //     try {
    //         axios.get(`http://localhost:8080/history-medical/id/${idHM}`).then((response) => {
    //             console.log(response);
    //             if (response.data === null) {
    //                 navigate('/not-found');
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const getDrugList = () => {
        try {
            axios.get('http://localhost:8080/service/list-service').then((response) => {
                setMedicineList(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };
    const getDoctor = () => {
        try {
            axios.get('http://localhost:8080/doctor/all-doctor').then((response) => {
                setDoctor(response.data);
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
        console.log('name,value', name, value);
        setNewPrescription((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'nameService') {
            const selectedMedicine = medicineList.find((medicine) => medicine.idService === Number(value));
            if (selectedMedicine) {
                setNewPrescription((prevState) => ({
                    ...prevState,
                    priceService: selectedMedicine.priceService,
                    nameService: selectedMedicine.nameService,
                    idService: selectedMedicine.idService,
                }));
            }
        }
    };
    const handleChangeDoctor = (event) => {
        const { name, value } = event.target;
        console.log('name,valuedoctor', name, value);
        setDoctorSelected(value);

        if (name === 'nameService') {
            const dt = doctor.find((medicine) => medicine.idDoctor === value);
            console.log('setDoctorSelected2', dt);
            setDoctorSelected2(dt);
        }
    };
    // const showTotal = () => {
    //     var sum = 0;

    //     for (var i = 0; i < prescriptionList.length; i++) {
    //         sum += Number(prescriptionList[i].price) * Number(prescriptionList[i].quantity);
    //     }
    //     setTotal(sum);
    //     return sum;
    // };

    const removePrescription = (idDrug) => {
        const newList = prescriptionList.filter((item) => item.idService !== idDrug);
        const newListId = prescriptionListId.filter((item) => item !== idDrug);
        setPrescriptionList(newList);
        setPrescriptionListId(newListId);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        checkForm
            .validate(newPrescription, { abortEarly: false })
            .then(() => {
                setValid({});
                setPrescriptionList((prevList) => [...prevList, newPrescription]);
                setPrescriptionListId((prevList) => [...prevList, newPrescription.idService]);
                setPrescriptionDetailDTOList((prevList) => [...prevList, { idService: newPrescription.idService }]);
                setNewPrescription({
                    idService: '',
                    priceService: '',
                    nameService: '',
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
            idDoctor: doctorSelected2.idDoctor,
            idServices: prescriptionListId
        };
        console.log(prescriptionDTO.idServices.toString());

        axios
            .post(`http://localhost:8080/service/create-doctor-service`, prescriptionDTO)
            .then((response) => {
                console.log('prescription response', response);
                if (response.data === 'FAIL') {
                } else {
                    toast.success('ĐÃ HOÀN TẤT ĐĂNG KÍ BÁC SĨ');
                    navigate('/listDoc');
                }
            })
            .catch((error) => {
                toast.error('THẤT BẠI');
                console.error(error);
            });
    };

    const cancelCreate = () => {
        toast.success('ĐÃ HOÀN TẤT');
        navigate('/listDoc');
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center m-5">
                <h2 className="text-uppercase">Thêm bác sĩ vào danh sách đăng kí thực hiện dịch vụ</h2>
            </div>
            <div className="d-flex row gap-5">
                <div className="d-flex justify-content-center gap-5">
                <form>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Vui lòng chọn bác sĩ</th>
                                    <td>
                                        <select
                                            className="w-200 d-flex justify-content-end"
                                            name="nameService"
                                            value={doctorSelected}
                                            onChange={handleChangeDoctor}
                                        >
                                            <option value={0}>Vui lòng chọn bác sĩ</option>
                                            {doctor.map((drug) => (
                                                <option key={drug.idDoctor} value={drug.idDoctor}>
                                                    Tên: <h3>{drug.name}</h3>, Tài khoản :{' '}
                                                    <h3>{drug.users.userName}</h3>
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <form onSubmit={handleSubmit} className="">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Tên dịch vụ</th>
                                    <td>
                                        <select
                                            className="w-100 d-flex justify-content-end"
                                            name="nameService"
                                            value={newPrescription.idService}
                                            onChange={handleChange}
                                        >
                                            <option value={0}>Vui lòng chọn dịch vụ</option>
                                            {medicineList.map((drug) => (
                                                <option key={drug.idService} value={drug.idService}>
                                                    {drug.nameService}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>ĐƠN GIÁ</th>
                                    <td>{convertCurrency(newPrescription.priceService)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button disabled={false} type="submit" className="btn btn-success btn-sm">
                            THÊM
                        </button>
                    </form>    
                </div>
                <div className="d-flex justify-content-center">
                    {doctorSelected2 && (
                        <div>
                            <div className="d-flex justify-content-center">
                                <h2>Danh sách dịch vụ đã chọn</h2>
                            </div>
                            <table className="table table-bordered table-striped">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>TÊN DỊCH VỤ</th>
                                        <th>ĐƠN GIÁ</th>
                                        <th>XÓA</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {prescriptionList.map((prescription, index) => (
                                        <tr key={index}>
                                            <td>{prescription.nameService}</td>
                                            <td>{prescription.priceService}</td>
                                            <td className="d-flex justify-content-between">
                                                <i
                                                    className="fa-solid fa-xmark text-danger"
                                                    onClick={() => removePrescription(prescription.idService)}
                                                ></i>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={2}>Bác sĩ đăng kí</td>
                                        {doctorSelected2 && <th>{doctorSelected2.name}</th>}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {prescriptionList.length > 0 && (
                    <div className="d-flex justify-content-sm-center">
                        <button
                            className="btn btn-secondary mr-2"
                            onClick={() => {
                                setPrescriptionList([]);
                                setPrescriptionListId([]);
                            }}
                        >
                            HỦY BỎ
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
                                <h5>XÁC NHẬN THÊM ĐĂNG KÍ NÀY?</h5>
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
