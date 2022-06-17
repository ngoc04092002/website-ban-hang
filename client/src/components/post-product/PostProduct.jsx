import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import Loading from '~/components/loading/Loading';
import styles from './postproduct.module.scss';
import useAuth from '~/hooks/useAuth';
import { storage } from '~/pages/auth/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {axiosProducts} from '~/api/request';

const cx = classNames.bind(styles);

const leftData = [
    {
        name: 'desc',
        label: 'Miêu tả sản phẩm',
    },
    {
        name: 'price',
        label: 'Giá sản phẩm',
    },
    {
        name: 'sale',
        label: 'Giá khuyến mãi',
    },
];
const Datas = [1, 2, 3, 4, 5];

const SignupSchema = yup.object().shape({
    desc: yup.string().max(100, 'Miêu tả quá dài'),
    price: yup.number(),
    sale: yup.number(),
});

const PostProduct = () => {
    const { user } = useAuth();
    const [image, setImage] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        desc: '',
        price: 0,
        sale: 0,
        colors: [],
        sizes: [],
    });

    const {
        reset,
        register,
        setError,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(SignupSchema),
    });

    const onSubmit = (data) => {
        let { desc, price, sale, ...spread } = data;
        let colors = [],
            sizes = [];
        let newArr = [];
        for (let i of Object.values(spread)) newArr.push(i);
        for (let i = 5; i < 10; i++) if (newArr[i].trim() !== '') colors.push(newArr[i].trim());
        for (let i = 0; i < 5; i++) if (newArr[i].trim() !== '') sizes.push(newArr[i].trim());

        if (sizes.length === 0) {
            setError('sizes', { message: 'Nhập ít nhất 1 kích cỡ' });
            return;
        }
        if (colors.length === 0) {
            setError('colors', { message: 'Nhập ít nhất 1 màu' });
            return;
        }
        let lenImages = image.length;
        if (lenImages === 0) {
            toast.warning('Chọn ít nhất 1 hình ảnh');
            return;
        }
        setLoading(true);

        //handle api cloudary image
        if (lenImages > 0) {
            for (let i = 0; i < lenImages; i++) {
                const imageRef = ref(storage, `images/${image[i].url.name + v4()}`);
                uploadBytes(imageRef, image[i].url).then((data) => {
                    getDownloadURL(data.ref)
                        .then((url) => {
                            setListImage((prev) => [...prev, url]);
                        })
                        .catch((err) => {
                            toast.error('Lỗi khi upload hình ảnh');
                        });
                });
            }
        }
        setValues({ desc, price, sale, colors, sizes });
    };

    //handle select IMG
    const handleImg = (e) => {
        let file = e.target.files;
        let lenFIle = file.length;

        if (lenFIle > 5) {
            toast.info('Bạn chỉ được chọn tối đa 5 hình ảnh');
            return;
        }
        let arrFile = [];
        for (let i = 0; i < lenFIle; i++) {
            arrFile.push({
                preview: URL.createObjectURL(file[i]),
                url: file[i],
            });
        }
        setImage((prev) => [...prev, ...arrFile]);
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(image);
        };
    }, [image]);

    useEffect(() => {
        if (listImage.length === image.length && listImage.length > 0) {
            async function postProduct() {
                try {
                    const { colors, desc, price, sale, sizes } = values;
                    const res = await axiosProducts.post(`${user.accessToken}`, {
                        desc,
                        price,
                        sale,
                        colors,
                        sizes,
                        img: listImage[0],
                        imgs: listImage,
                    });

                    if (res.data.success) {
                        toast.success('Cập nhật thành công');
                        setLoading(false);
                        setImage([]);
                        reset();
                    }
                } catch (e) {
                    toast.error('Đăng sản phẩm thất bại');
                }
            }
            postProduct();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listImage.length === image.length]);

    return (
        <Container className={cx('post_product')}>
            <h1>Đăng Sản phẩm</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('left')}>
                    <ul>
                        {leftData.map((item, index) => (
                            <li key={index}>
                                <Box
                                    className={cx('left_item')}
                                    sx={{
                                        width: '31rem',
                                        maxWidth: '100%',
                                    }}
                                >
                                    <TextField
                                        autoComplete="off"
                                        error={errors[item.name] ? true : false}
                                        helperText={errors[item.name] && 'Giá phải là số'}
                                        {...register(item.name)}
                                        fullWidth
                                        label={item.label}
                                        id={item.label}
                                        InputProps={
                                            item.name !== 'desc'
                                                ? {
                                                      endAdornment: (
                                                          <InputAdornment position="end">
                                                              {item.name === 'price' ? 'đ' : '%'}
                                                          </InputAdornment>
                                                      ),
                                                  }
                                                : { endAdornment: <DriveFileRenameOutlineIcon /> }
                                        }
                                    />
                                </Box>
                            </li>
                        ))}
                    </ul>
                    <Stack spacing={3} direction="column">
                        <Stack style={{ position: 'relative' }} spacing={2} direction="row">
                            {Datas.map((item) => (
                                <Box
                                    className={cx('left_item1')}
                                    key={item}
                                    sx={{
                                        width: 'calc(31rem/5 - 13px)',
                                        maxWidth: '100%',
                                    }}
                                >
                                    <TextField
                                        autoComplete="off"
                                        {...register(`size-${item}`)}
                                        fullWidth
                                        label={`size-${item}`}
                                        id={`size-${item}`}
                                    />
                                </Box>
                            ))}
                            {errors.sizes && (
                                <span
                                    style={{
                                        color: 'red',
                                        position: 'absolute',
                                        bottom: '-16px',
                                        left: '-15px',
                                        fontSize: '14px',
                                    }}
                                >
                                    {errors.sizes.message}
                                </span>
                            )}
                        </Stack>
                        <Stack style={{ position: 'relative' }} spacing={2} direction="row">
                            {Datas.map((item) => (
                                <Box
                                    className={cx('left_item1')}
                                    key={item}
                                    sx={{
                                        width: 'calc(31rem/5 - 13px)',
                                        maxWidth: '100%',
                                    }}
                                >
                                    <TextField
                                        autoComplete="off"
                                        {...register(`color-${item}`)}
                                        fullWidth
                                        label={`color-${item}`}
                                        id={`color-${item}`}
                                    />
                                </Box>
                            ))}
                            {errors.colors && (
                                <span
                                    style={{
                                        color: 'red',
                                        position: 'absolute',
                                        bottom: '-16px',
                                        left: '-15px',
                                        fontSize: '14px',
                                    }}
                                >
                                    {errors.colors.message}
                                </span>
                            )}
                        </Stack>
                    </Stack>
                    {loading && <Loading />}
                    {!loading && (
                        <Button className={cx('btn')} type="submit" variant="contained">
                            Đăng Sản Phẩm
                        </Button>
                    )}
                </div>

                <div className={cx('right')}>
                    <ImageList
                        className={cx('img-list')}
                        sx={{ width: '90%', height: '100%', borderRadius: '10px', overflowY: 'scroll' }}
                        cols={2}
                        rowHeight={173}
                    >
                        {image.map((item, index) => (
                            <ImageListItem key={index}>
                                <img src={item.preview} srcSet={item.preview} alt="img" loading="lazy" />
                            </ImageListItem>
                        ))}
                    </ImageList>

                    <p>Bạn được chọn tối đa 6 ảnh</p>
                    <Stack style={{ position: 'relative' }} spacing={2} direction="row">
                        <label htmlFor="contained-button-file">
                            <Input
                                onChange={handleImg}
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            {loading && <Loading />}
                            {!loading && (
                                <Button variant="contained" component="span">
                                    Tải lên
                                </Button>
                            )}
                        </label>
                        {!loading && (
                            <Button
                                onClick={() => {
                                    if (image.length > 0) setImage([]);
                                }}
                                type="button"
                                variant="contained"
                            >
                                Xóa hết
                            </Button>
                        )}
                    </Stack>
                </div>
            </form>
        </Container>
    );
};
const Input = styled('input')({
    display: 'none',
});

export default PostProduct;
