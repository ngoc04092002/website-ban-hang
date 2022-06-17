import React, { useState } from 'react';
import propTypes from 'prop-types';
import './product.scss';
import { motion } from 'framer-motion';
import { BsThreeDotsVertical, BsTrash, BsFillPencilFill } from 'react-icons/bs';
import moment from 'moment';
import { toast } from 'react-toastify';
import { ref, deleteObject } from 'firebase/storage';

import { AiOutlineLoading } from 'react-icons/ai';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

import { storage } from '~/pages/auth/firebase';
import {axiosProducts} from '~/api/request';

const Products = ({ product, personal }) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({
        desc: product.desc,
        price: product.price,
        sale: product.sale,
        sizes: product.sizes,
        colors: product.colors,
    });
    const [open, setOpen] = useState(false);
    const momentTime = moment(product.createdAt).format('l');
    
    const handleUpdate = async () => {
        try {
            setLoading(true);
            await axiosProducts.put(`update-personal/${product._id}`, value);
            toast.success('Cập nhật thành công');
            setLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 1800);
        } catch (e) {
            console.log(e);
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };
    const handleChange = (e) => {
        if (e.target.id.startsWith('outlined')) {
            let name = e.target.id.split('-');
            setValue((prev) => {
                let type = name[1];
                prev[type][+name[2]] = e.target.value;
                return {
                    ...prev,
                };
            });
        } else {
            setValue((prev) => {
                return {
                    ...prev,
                    [e.target.id]: e.target.value,
                };
            });
        }
    };

    const handleDelete = async () => {
        try {
            if (product.imgs[0].startsWith('https://firebasestorage')) {
                deleteObject(
                    ref(
                        storage,
                        `images/${decodeURIComponent(product?.img).slice(
                            81,
                            decodeURIComponent(product?.img).indexOf('?'),
                        )}`,
                    ),
                );
                const lenImgs = product.imgs.length;
                for (let i = 0; i < lenImgs; i++) {
                    let pathImage = decodeURIComponent(product?.imgs[i]);
                    let refImage = pathImage.slice(81, pathImage.indexOf('?'));
                    let desertRef = ref(storage, `images/${refImage}`);
                    await deleteObject(desertRef);
                }
            }
            const res = await axiosProducts.delete(`destroy/${product._id}`);
            if (res.data.success) toast.success('Xóa sản phẩm thành công');
            setTimeout(() => {
                window.location.reload();
            }, 1800);
        } catch (e) {
            toast.error('Lỗi kết nối');
        }
    };

    return (
        <motion.div
            className="search_product"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <a
                href={`/products/${product._id}`}
                className={personal ? 'product__container products__personal' : 'product__container'}
            >
                <div className="product__container-left">
                    <img src={product.img} alt="product" />
                </div>
                <div className="product__container-right">
                    <p className="desc">{product.desc}</p>
                    <p className="price" style={personal && { fontSize: '1rem' }}>
                        sale: <span>{product.sale}%</span>
                        price: <span>{product.price}₫</span>
                    </p>
                    {personal && <p style={{ fontSize: '.8rem' }}>Tạo: {momentTime}</p>}
                </div>
            </a>
            {personal && (
                <span className="icon-dot">
                    <BsThreeDotsVertical />
                    <ul>
                        <li onClick={() => setOpen(true)}>
                            sửa
                            <BsFillPencilFill />
                        </li>
                        <li onClick={handleDelete}>
                            Xóa
                            <BsTrash />
                        </li>
                    </ul>
                </span>
            )}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" marginBottom={4} display="flex" alignItems="center">
                        <Typography flex={1} id="modal-modal-title" variant="h6" component="h2">
                            Chỉnh sửa sản phẩm
                        </Typography>
                        <ClearIcon onClick={() => setOpen(false)} style={{ fontSize: 33, cursor: 'pointer' }} />
                    </Stack>
                    <Stack spacing={2} direction="column">
                        <TextField
                            sx={{ width: '100%' }}
                            id="desc"
                            label="Miêu tả"
                            onChange={handleChange}
                            value={value.desc}
                            type="text"
                            autoComplete="current-desc"
                        />
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="price">Giá tiền</InputLabel>
                            <OutlinedInput
                                id="price"
                                type="number"
                                value={value.price}
                                onChange={handleChange}
                                endAdornment={<InputAdornment position="start">đ</InputAdornment>}
                                label="Giá tiền"
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="sale">Giảm</InputLabel>
                            <OutlinedInput
                                id="sale"
                                type="number"
                                onChange={handleChange}
                                value={value.sale}
                                endAdornment={<InputAdornment position="start">%</InputAdornment>}
                                label="Giảm"
                            />
                        </FormControl>
                        <Stack direction="row" spacing={1}>
                            {value.sizes.map((size, index) => (
                                <TextField
                                    key={index}
                                    label="Size"
                                    value={size}
                                    onChange={handleChange}
                                    id={`outlined-sizes-${index}`}
                                    size="small"
                                />
                            ))}
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            {value.colors.map((color, index) => (
                                <TextField
                                    key={index}
                                    label="Color"
                                    value={color}
                                    onChange={handleChange}
                                    id={`outlined-colors-${index}`}
                                    size="small"
                                />
                            ))}
                        </Stack>
                        <Button
                            onClick={handleUpdate}
                            sx={{ width: 90 }}
                            className="update-btn"
                            disabled={loading}
                            variant="contained"
                            startIcon={loading && <AiOutlineLoading />}
                        >
                            Sửa
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </motion.div>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

Products.propTypes = {
    product: propTypes.object.isRequired,
    personal: propTypes.bool,
}

export default Products;
