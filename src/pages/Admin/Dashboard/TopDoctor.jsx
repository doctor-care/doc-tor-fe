// ** MUI Imports

import { styled } from '@mui/material/styles';

import MuiDivider from '@mui/material/Divider';
import { useEffect } from 'react';
// import { topProductByPeriodTime } from '../../../services/RevenueService';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ExportExcel from './ExportExcel';
import { Button, Menu, MenuItem } from '@mui/material';
import { Download } from '@mui/icons-material';
import axios from 'axios';

const TopDoctor = (props) => {
    const [productList, setProductList] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        const fetchData = async () => {
            if (props.startDate && props.endDate) {
                axios
                    .get(
                        `http://localhost:8080/report/top-doctor?startDate=${props.startDate}&endDate=${props.endDate}`,
                    )
                    .then((response) => {
                        setProductList(response.data);
                    })
                    .catch((error) => console.error);
            }
        };

        fetchData();
    }, [props.startDate, props.endDate]);
    console.log(productList);

    const columns = [
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'avatar',
            headerName: 'Avatar',
            width: 60,
            sortable: false,
            filterable: false,
            renderCell: (params) => <img className="img__product--admin" src={params.value} alt="avatar" />,
        },
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'username',
            headerName: 'Thông tin',
            width: 150,
            renderCell: (params) => (
                <div>
                    <div className="fw-bold mb-1">{params.value}</div>
                    <div>{params.row.name}</div>
                </div>
            ),
        },
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'times',
            headerName: 'Số lần đặt',
            width: 120,
            type: 'number',
        },
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'averageRate',
            headerName: 'Đánh giá',
            width: 150,
            type: 'number',
            renderCell: (params) => <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.2 }}>{params.value}</div>,
        },

        // {
        //     renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
        //     field: 'revenue',
        //     headerName: 'Revenue',
        //     width: 80,
        //     type: 'number',
        //     valueFormatter: (params) => {
        //         return params.value;
        //     },
        // },
    ];

    const rows = productList?.length > 0 ? productList : [];

    return (
        <div style={{ height: '55vh', width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center mb-1">
                <h5 className="fw-semibold ms-2 ">Top bác sĩ được yêu thích</h5>

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
                        <ExportExcel data={[productList]} label={['Best Selling Product']} />
                    </MenuItem>
                </Menu>
            </div>
            <DataGrid
                rowHeight={60}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                getRowId={(row) => row.doctorId}
            />
        </div>
    );
};

export default TopDoctor;
