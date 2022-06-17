import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './products.module.scss';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

import EventNoteIcon from '@mui/icons-material/EventNote';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import useAuth from '~/hooks/useAuth';
import Loading from '../loading/Loading';
import SearchRegister from '../search/SearchRegister';
import Products from '../search/Products';
import {axiosProducts} from '~/api/request';

const cx = classNames.bind(styles);

const Datas = [
    {
        label: 'Đồ dùng',
        type: 'type',
        children: [
            {
                value: 'Giày',
                title: 'Giày',
            },
            {
                value: 'Quần',
                title: 'Quần',
            },
            {
                value: 'Áo',
                title: 'Áo',
            },
            {
                value: 'Mũ',
                title: 'Mũ',
            },
            {
                value: 'All',
                title: 'Tất cả',
            },
        ],
    },
    {
        label: 'Sắp xếp',
        type: '_sort',
        children: [
            {
                value: 'desc',
                title: 'Mới nhất',
            },
            {
                value: 'asc',
                title: 'Cũ nhất',
            },
        ],
    },
];

const ProductsPersonal = () => {
    const { user } = useAuth();
    const [params, setParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [clothes, setClothes] = useState({
        type: '',
        _sort: '',
    });
    const [listProducts, setListProducts] = useState([]);

    const handleChange = (e) => {
        setClothes({ ...clothes, [e.target.name]: e.target.value });
    };

    const handleFilter = () => {
        const { _sort, type } = clothes;
        if (!_sort && !type) return;
        setParams({ _sort, type });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosProducts.get(`products-personal/${user.accessToken}`);
                setListProducts(res.data.product);
                setLoading(false);
            } catch (e) {
                console.log('error', e);
                toast.error('Lỗi kết nối');
            }
        };
        fetchData();
        setParams({});
    }, [user, setParams]);

    return (
        <>
            <section className={cx('left')}>
                <h1>
                    <EventNoteIcon />
                    Các sản phẩm của bạn
                </h1>
                {!loading && listProducts.length === 0 && <Link to="/profile/post">Đăng sản phẩm nào!!</Link>}
                {loading && <Loading />}
                {!!listProducts && listProducts.length > 0 && (
                    <motion.div layout className={cx('list_products')}>
                        <AnimatePresence>
                            {listProducts.map((product, index) => (
                                <Products personal={true} key={index} product={product} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>

            <div className={cx('right')}>
                <div className={cx('right-search')}>
                    <SearchRegister
                        Params={params}
                        path={`search-personal/${user.accessToken}`}
                        setListProducts={setListProducts}
                    />
                </div>
                {Datas.map((item, index) => (
                    <Box key={index}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{item.label}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={clothes[item.type]}
                                label="clothes"
                                name={item.type}
                                onChange={handleChange}
                            >
                                {item.children.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>
                                        {item.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                ))}
                <Button onClick={handleFilter} variant="contained">
                    Lọc sản phẩm
                </Button>
            </div>
        </>
    );
};

export default ProductsPersonal;
