import React, { useState, memo } from 'react';
import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import { BsPersonLinesFill, BsXLg } from 'react-icons/bs';
import Button from '@mui/material/Button';
import { AiOutlineLoading } from 'react-icons/ai';

import styles from './delivery.module.scss';
import { axiosOrder } from '~/api/request';
import useAuth from '~/hooks/useAuth';
import { deleteJob, refreshSelect } from '~/context/AuthActions';

const cx = classNames.bind(styles);

const inforDelivery = [
    {
        name: 'name',
        label: 'Họ và tên',
        value: 'Vũ Văn Ngọc',
    },
    {
        name: 'phone',
        label: 'Số điện thoại',
        value: '0338787233',
    },
    {
        name: 'address',
        label: 'Địa chỉ',
        value: 'Từ Sơn,Bắc Ninh',
    },
];

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const addressRegExp = /[abcdefghijklmnopqrstuvwxyz]+/;

const schema = yup.object().shape({
    name: yup.string().trim().required('Tên không được để trống'),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
        .min(8, 'Số điện thoại không được ít hơn 8 ký tự')
        .required('Số điện thoại không được để trống'),
    address: yup.string().trim().matches(addressRegExp, 'Địa chỉ không hợp lệ').required('Địa chỉ không được để trống'),
});

const Delivery = ({
    selectedIds,
    dispatchToggle,
    dispatchEvent,
    cart = false,
    quantity,
    selectedColor,
    selectedSize,
    datas,
    setOpen,
    open,
}) => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleClose = (e) => {
        let className = e.target.getAttribute('class')?.split(' ')[0];

        let arrClassName = {
            'MuiBackdrop-root': true,
            delivery_icon__m51s7: true,
        };
        if (arrClassName[className] || e.target.getAttribute('id') === 'cancel' || e.target.getAttribute('d'))
            setOpen(false);
    };

    const {
        reset,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            phone: '',
            address: '',
        },
    });

    const onSubmit = async (data) => {
        if (cart) {
            selectedColor = 'Trắng';
            selectedSize = 'L';
            if (selectedIds.length === 0) {
                toast.info('Vui lòng chọn ít nhất 1 sản phẩm');
                return;
            }
        }
        if (typeof selectedColor === 'undefined' || typeof selectedSize === 'undefined') {
            setLoading(false);
            toast.info('Vui lòng chọn màu sắc và kích cỡ');
            return;
        }
        try {
            if (!Array.isArray(datas)) datas = [datas];
            setLoading(true);
            for (let i = 0; i < datas.length; i++) {
                if (cart && !selectedIds.includes(datas[i].id)) continue;
                if (cart) quantity = datas[i].quantity;
                const { sale, price, desc } = datas[i];

                let bill = Math.floor((quantity *(price-price* sale/100)));
                const overallDatas = {
                    //nên tạo email tránh trường hợp cookie hết hạn
                    user: user.accessToken,
                    desc,
                    amount: quantity,
                    namePerson: data.name,
                    ...data,
                    color: selectedColor,
                    size: selectedSize,
                    totalMoney: bill,
                };

                if (cart) {
                    dispatchEvent(deleteJob({ id: datas[i].id }));
                }
                await axiosOrder.post('customer-order', overallDatas);
            }
            if (cart) dispatchToggle(refreshSelect());
            toast.success('Đặt hàng thành công');
            setLoading(false);
            setOpen(false);
            reset();
        } catch (e) {
            console.log(e);
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cx('delivery')}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <section className={cx('wrapper')}>
                    <header>
                        <h1>
                            <BsPersonLinesFill style={{ marginRight: 10 }} />
                            thông tin cá nhân
                        </h1>
                        <BsXLg
                            onClick={handleClose}
                            className={cx('icon')}
                            style={{ marginLeft: '1rem', cursor: 'pointer', color: 'black', fontSize: 28 }}
                        />
                    </header>
                    <div className={cx('infor-personal')}>
                        {inforDelivery.map((item, index) => (
                            <TextField
                                error={!!errors[item.name]}
                                {...register(item.name)}
                                className={cx('input')}
                                key={index}
                                id="outlined-required"
                                label={item.label}
                                defaultValue={item.value}
                                helperText={!!errors[item.name] && errors[item.name].message}
                            />
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Button id="cancel" onClick={handleClose} size="medium" variant="outlined">
                            hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            size="medium"
                            variant="contained"
                            startIcon={loading && <AiOutlineLoading className={cx('rotate')} />}
                        >
                            Mua ngay
                        </Button>
                    </div>
                </section>
            </Backdrop>
        </form>
    );
};

Delivery.propTypes = {
    selectedIds: propTypes.array,
    dispatchToggle: propTypes.func,
    dispatchEvent: propTypes.func,
    cart: propTypes.bool,
    quantity: propTypes.number,
    selectedColor: propTypes.string,
    selectedSize: propTypes.string,
    setOpen: propTypes.func,
    open: propTypes.bool,
};

export default memo(Delivery);
