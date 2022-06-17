import { memo } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { toast } from 'react-toastify';

import {axiosOrder} from '~/api/request';

const EnhancedTableToolbar = (props) => {
    const { numSelected, ids } = props;

    const handleDelete = async () => {
        try {
            const res = await axiosOrder.post('delete-order', {ids});
            if(res.data.success) toast.success('Xóa thành công');
            setTimeout(()=>{
                window.location.reload();
            },1800);    
        } catch (e) {
            console.log(e);
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Đơn hàng
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip onClick={handleDelete} title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default memo(EnhancedTableToolbar);
