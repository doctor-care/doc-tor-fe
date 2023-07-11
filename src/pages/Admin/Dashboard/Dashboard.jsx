import { Grid } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import CardStatsVertical from './CardStatsVertical';
import CartCheck from 'mdi-material-ui/CartCheck';
import AccountPlus from 'mdi-material-ui/AccountPlus';
import Account from 'mdi-material-ui/Account';
import ApexChartWrapper from './ApexChartWrapper';
import { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import ChartReport from './ChartReport';
import axios from 'axios';
import TopDoctor from './TopDoctor';
import './abc.css';

const reportSchema = Yup.object().shape({
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string()
        .required('End date is required')
        .test('is-greater-than-start', 'End date is greater than start date', function (endDate) {
            const startDate = this.resolve(Yup.ref('startDate'));
            if (startDate && endDate) {
                return new Date(endDate) > new Date(startDate);
            }
            return true;
        }),
});

function Dashboard() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUserInfor')).currentUser.userName || '';

    const currentDate = moment().format('YYYY-MM-DD');
    const oneWeekAgo = moment(currentDate).subtract(1, 'week').format('YYYY-MM-DD');
    const oneWeekAgoPlusOneDay = moment(oneWeekAgo).add(1, 'day').format('YYYY-MM-DD');
    const [startDate, setStartDate] = useState(oneWeekAgoPlusOneDay);
    const [endDate, setEndDate] = useState(currentDate);
    const [reportForm, setReportForm] = useState({
        startDate: oneWeekAgoPlusOneDay || '',
        endDate: currentDate || '',
    });
    const handleStartDateChange = (event, setFieldValue) => {
        const value = event.target.value;
        setFieldValue('startDate', value);
    };

    const handleEndDateChange = (event, setFieldValue) => {
        const value = event.target.value;
        setFieldValue('endDate', value);
    };

    useEffect(() => {
        const currentDate = moment().format('YYYY-MM-DD');
        const oneWeekAgo = moment(currentDate).subtract(1, 'week').format('YYYY-MM-DD');
        const oneWeekAgoPlusOneDay = moment(oneWeekAgo).add(1, 'day').format('YYYY-MM-DD');
        setStartDate(oneWeekAgoPlusOneDay);
        setEndDate(currentDate);
    }, []);

    const [summary, setSummary] = useState();
    useEffect(() => {
        axios
            .get(`http://localhost:8080/report/summary?startDate=${startDate}&endDate=${endDate}`)
            .then((response) => {
                console.log(response);
                const data = response.data;
                setSummary(data);
            })
            .catch((error) => console.error);
    }, [endDate, startDate]);
    console.log(summary);

    const handleSubmit = (values) => {
        setStartDate(values.startDate);
        setEndDate(values.endDate);
    };
    console.log(startDate, endDate);
    return (
        <div className="flex justify-content-center " style={{ marginTop: '95px' }}>
            <div className="max-w-screen-xl">
                <ApexChartWrapper>
                    <Grid container xs={12}>
                        <Grid item md={6}>
                            <div className="flex-grow-1">
                                <h4 className="fs-16 mb-1">Xin chào!</h4>
                                <p className="text-muted mb-0">Chào mừng bạn đến trang thống kê</p>
                            </div>
                        </Grid>
                        <Grid md={6} marginBottom={10}>
                            <Formik
                                initialValues={reportForm}
                                validationSchema={reportSchema}
                                onSubmit={(values) => handleSubmit(values)}
                            >
                                {({ errors, touched, setFieldValue }) => (
                                    <Form>
                                        <div className="mb-4">
                                            <div className="row ">
                                                <div className=" col-5 p-0 m-0 flex items-center rounded border  justify-content-center  ">
                                                    <label htmlFor="startDate" style={{ margin: '0px  4px 0px 0px ' }}>
                                                        Ngày bắt đầu:
                                                    </label>

                                                    <Field
                                                        className="ngay"
                                                        id="startDate"
                                                        name="startDate"
                                                        as="input"
                                                        type="date"
                                                        onChange={(event) =>
                                                            handleStartDateChange(event, setFieldValue)
                                                        }
                                                    />
                                                    <div className="error ms-3">
                                                        {errors.startDate && touched.startDate ? (
                                                            <div>{errors.startDate}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="col-5 p-0 m-0 flex items-center rounded border  justify-content-center ">
                                                    <label htmlFor="endDate" style={{ margin: '0px  4px 0px 0px ' }}>
                                                        Ngày kết thúc
                                                    </label>

                                                    <Field
                                                        className="ngay"
                                                        id="endDate"
                                                        name="endDate"
                                                        as="input"
                                                        type="date"
                                                        onChange={(event) => handleEndDateChange(event, setFieldValue)}
                                                    />
                                                    <div className="error ms-3">
                                                        {errors.endDate && touched.endDate ? (
                                                            <div>{errors.endDate}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="col-2 ">
                                                    <label for="" className="form-label"></label>
                                                    <button
                                                        className="btn btn-success px-4"
                                                        type="submit"
                                                        style={{ zIndex: 999 }}
                                                    >
                                                        Xem
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6}>
                        {summary && (
                            <Grid item md={12} lg={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} md={4}>
                                        <CardStatsVertical
                                            stats={summary.totalSchedule}
                                            title="Tổng ca khám được đăng ký"
                                            trend={summary.scheduleChangePercent < 0 ? 'negative' : 'positive'}
                                            color="secondary"
                                            trendNumber={
                                                typeof summary.scheduleChangePercent === 'number'
                                                    ? `${summary.scheduleChangePercent.toFixed(0)}%`
                                                    : 'N/A'
                                            }
                                            subtitle="Past Month"
                                            icon={<CartCheck />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <CardStatsVertical
                                            stats={summary.totalSuccessSchedule}
                                            trend={summary.scheduleSuccessChangePercent < 0 ? 'negative' : 'positive'}
                                            trendNumber={
                                                typeof summary.scheduleSuccessChangePercent === 'number'
                                                    ? `${summary.scheduleSuccessChangePercent.toFixed(0)}%`
                                                    : 'N/A'
                                            }
                                            color="info"
                                            title="Tổng ca khám thành công"
                                            subtitle="Yearly Project"
                                            icon={<Account />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <CardStatsVertical
                                            stats={summary.totalPatient}
                                            trend={summary.patientChangePercent < 0 ? 'negative' : 'positive'}
                                            trendNumber={
                                                typeof summary.patientChangePercent === 'number'
                                                    ? `${summary.patientChangePercent.toFixed(0)}%`
                                                    : 'N/A'
                                            }
                                            color="warning"
                                            title="Tổng bệnh nhân"
                                            subtitle="Yearly Project"
                                            icon={<AccountPlus />}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}

                        <Grid item md={12} lg={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={7}>
                                    {startDate && endDate && <ChartReport startDate={startDate} endDate={endDate} />}
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    {startDate && endDate && <TopDoctor startDate={startDate} endDate={endDate} />}
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* 
                        <Grid item md={12} lg={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={7}>
                                    {startDate && endDate && <TopProduct startDate={startDate} endDate={endDate} />}
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    {startDate && endDate && <TopUser startDate={startDate} endDate={endDate} />}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} marginTop={5}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                    {startDate && endDate && <OrderRecent startDate={startDate} endDate={endDate} />}
                                </Grid>
                            </Grid>
                        </Grid> */}
                    </Grid>
                </ApexChartWrapper>
            </div>
        </div>
    );
}

export default Dashboard;
