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

const TopProduct = (props) => {
    const [productList, setProductList] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        const fetchData = async () => {
            // if (props.startDate && props.endDate) {
            //     const categoryData = await topProductByPeriodTime(props.startDate, props.endDate);
            //     setProductList(categoryData.data);
            // }
        };

        fetchData();
    }, [props.startDate, props.endDate]);
    console.log(productList);

    const columns = [
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'image',
            headerName: 'Image',
            width: 80,
            sortable: false,
            filterable: false,
            renderCell: (params) => <img className="img__product--admin" src={params.value} alt="product" />,
        },
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'productName',
            headerName: 'Product name',
            width: 150,
            renderCell: (params) => <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.2 }}>{params.value}</div>,
        },
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'price',
            headerName: 'Price',
            width: 80,
            type: 'number',
            valueFormatter: (params) => {
                return params.value;
            },
        },

        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'quantity',
            headerName: 'Quantity',
            width: 80,
            type: 'number',
            valueFormatter: (params) => {
                const inventoryQuantity = params.value;
                return inventoryQuantity;
            },
        },
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'orders',
            headerName: 'Orders',
            width: 60,
            type: 'number',
        },
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'revenue',
            headerName: 'Revenue',
            width: 80,
            type: 'number',
            valueFormatter: (params) => {
                return params.value;
            },
        },
    ];

    const rows = productList?.length > 0 ? productList : [];

    return (
        <div style={{ height: '87vh', width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-semibold ms-2 ">Best Selling Products</h5>

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
                rowHeight={80}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                getRowId={(row) => row.productId}
            />
        </div>
    );
};

export default TopProduct;
