import React from 'react';
import classNames from 'classnames/bind';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from './table.module.scss';

const cx = classNames.bind(styles);

function createData(name, trackingId, date, status) {
    let text = status.toLowerCase();
    return { name, trackingId, status: text, date };
}

const rows = [
    createData('Frozen yoghurt', 18908424, '4/9/2002', 'Approved'),
    createData('Ice cream sandwich', 18908424, '4/9/2002', 'Pending'),
    createData('Eclair', 18908424, '4/9/2002', 'Approved'),
    createData('Cupcake', 18908424, '4/9/2002', 'Delivered'),
];

const makeStyles = (status) => {
    switch (status) {
        case 'approved':
            return {
                background: 'rgb(145 254 159/47%)',
                color: 'green',
            };
        case 'pending':
            return {
                background: '#ffadad8f',
                color: 'red',
            };
        default:
            return {
                background: '#59bfff',
                color: 'white',
            };
    }
};

const TableDash = () => {
    return (
        <div className={cx('table')}>
            <h3 style={{ textTransform: 'capitalize' }}>Những đơn hàng gần đây</h3>
            <TableContainer component={Paper} style={{ boxShadow: '0 13px 20px 0 #80808029' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sản phẩm</TableCell>
                            <TableCell align="left">theo dõi ID</TableCell>
                            <TableCell align="left">Ngày Tháng</TableCell>
                            <TableCell align="left">Trạng thái</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.trackingId}</TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">
                                    <span className={cx('status')} style={makeStyles(row.status)}>
                                        {row.status === 'approved' && 'Đã Duyệt'}
                                        {row.status === 'pending' && 'Đang Xử Lí'}
                                        {row.status === 'delivered' && 'Đã Giao'}
                                    </span>
                                </TableCell>
                                <TableCell align="left">Chi tiết</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableDash;
