import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import { Button, Menu, MenuItem } from '@mui/material';
import { Download } from '@mui/icons-material';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import ExportExcel from './ExportExcel';

Chart.register(CategoryScale);

const ChartReport = (props) => {
    const [orderList, setOrderList] = useState();
    const [revenueList, setRevenueList] = useState();
    const [revenueLabels, setRevenueLabels] = useState([]);
    const [dataRevenueChart, setRevenueDataChart] = useState([]);
    const [orderLabels, setOrderLabels] = useState([]);
    const [dataOrderChart, setOrderDataChart] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        const fetchData = async () => {
            if (props.startDate && props.endDate) {
                axios
                    .get(
                        `http://localhost:8080/report/total-schedule?startDate=${props.startDate}&endDate=${props.endDate}`,
                    )
                    .then((response) => {
                        const data = response.data;
                        setOrderList(data);
                    })
                    .catch((error) => console.error);
                axios
                    .get(
                        `http://localhost:8080/report/total-success-schedule?startDate=${props.startDate}&endDate=${props.endDate}`,
                    )
                    .then((response) => {
                        const data = response.data;
                        setRevenueList(data);
                    })
                    .catch((error) => console.error);
            }
        };

        fetchData();
    }, [props.startDate, props.endDate]);

    useEffect(() => {
        let timeLabel = [];
        let dataRevenue = [];
        revenueList?.forEach((data) => {
            timeLabel = [...timeLabel, data.time];
            dataRevenue = [...dataRevenue, data.totalSchedule];
        });
        setRevenueLabels([...timeLabel]);
        setRevenueDataChart([...dataRevenue]);
    }, [revenueList]);
    useEffect(() => {
        let timeLabel = [];
        let dataRevenue = [];
        orderList?.forEach((order) => {
            timeLabel = [...timeLabel, order.time];
            dataRevenue = [...dataRevenue, order.totalSchedule];
        });
        setOrderLabels([...timeLabel]);
        setOrderDataChart([...dataRevenue]);
    }, [orderList]);

    console.log(orderList, revenueList);
    const data = {
        labels: orderLabels,
        datasets: [
            {
                label: 'Tổng đăng ký',
                type: 'line',
                data: dataOrderChart || [],
                fill: false,
                borderColor: '#788FD5',
                backgroundColor: '#788FD5',
                yAxisID: 'y-axis-1',
            },
            {
                label: 'Tổng đăng ký thực hiện thành công',
                type: 'line',
                data: dataRevenueChart || [],
                fill: false,
                borderColor: '#DFA693',
                backgroundColor: '#DFA693',
                yAxisID: 'y-axis-1',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },
            ],
        },
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h5 className="fw-semibold ms-2 ">Biểu đồ</h5>

                <Button
                    onClick={handleClick}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textTransform: 'none',
                        gap: '1rem',
                    }}
                >
                    <Download sx={{ color: '#CCA752', fontSize: '25px' }} />
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <MenuItem>
                        {' '}
                        <ExportExcel data={[revenueList, orderList]} label={['Revenue', 'Total Orders']} />
                    </MenuItem>
                </Menu>
            </div>
            <Card
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: ['column', 'column', 'row'],
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Line data={data} options={options} />
                </Box>
            </Card>
        </div>
    );
};

export default ChartReport;
