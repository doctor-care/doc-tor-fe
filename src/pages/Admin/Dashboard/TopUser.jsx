import { useEffect } from 'react';
// import { topUserByPeriodTime } from '../../../services/RevenueService';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Menu, MenuItem } from '@mui/material';
import { Download } from '@mui/icons-material';
import ExportExcel from './ExportExcel';
import user_icon from '../../Admin/Dashboard/assets/avatar_user.png';

const TopUser = (props) => {
    const [userList, setUserList] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        const fetchData = async () => {
            // if (props.startDate && props.endDate) {
            //     const categoryData = await topUserByPeriodTime(props.startDate, props.endDate);
            //     setUserList(categoryData.data);
            // }
        };

        fetchData();
    }, [props.startDate, props.endDate]);

    const columns = [
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'avatar',
            headerName: 'Avatar',
            width: 80,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <img className="img__avatar--admin" src={params.value || user_icon} alt="product" />
            ),
        },
        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'username',
            headerName: 'Username',
            width: 150,
            renderCell: (params) => (
                <div>
                    <div className="fw-bold mb-1">{params.value}</div>
                    <div>
                        {params.row.firstName} {params.row.lastName}
                    </div>
                </div>
            ),
        },

        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'orders',
            headerName: 'Orders',
            width: 80,
        },

        {
            renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
            field: 'spending',
            headerName: 'Spending',
            width: 80,
            valueFormatter: (params) => {
                return params.value;
            },
        },
    ];

    const rows = userList?.length > 0 ? userList : [];

    return (
        <div style={{ height: '87vh', width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-semibold ms-2 ">Top Users</h5>

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
                        <ExportExcel data={[userList]} label={['Top Users']} />
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
                getRowId={(row) => row.username}
            />
        </div>
    );
};

export default TopUser;
