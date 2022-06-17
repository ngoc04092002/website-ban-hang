import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormSubtract } from 'react-icons/gr';
import { TiTick } from 'react-icons/ti';
import { BsCartPlus } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import Delivery from '../info-delivery/Delivery';
import { addJob } from '~/context/AuthActions';
import styles from './inforitem.module.scss';
import { axiosProducts } from '~/api/request';
import Loading from '../loading/Loading';
import Comments from './comments/Comments';

const cx = classNames.bind(styles);

const InforItem = ({ dispatchEvent }) => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [i, setI] = useState(0);
    const [color, setColor] = useState(-1);
    const [size, setSize] = useState(-1);
    const [value, setValue] = useState(1);

    const { id } = useParams();
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        document.title = 'Product';
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosProducts.get(`${id}`);
                setLoading(false);
                setProducts(res.data.product);
            } catch (e) {
                setError(true);
                toast.error('Lỗi kết nối');
                console.log('error', e);
            }
        };
        fetchData();
    }, [id]);

    const handleColor = (index) => {
        if (index === color && color !== -1) setColor(-1);
        else setColor(index);
    };
    const handleSize = (index) => {
        if (index === size && size !== -1) setSize(-1);
        else setSize(index);
    };

    const handleAddCart = () => {
        if (color === -1 || size === -1) {
            toast.info('Vui lòng chọn màu và kích cỡ');
            return;
        }

        dispatchEvent(
            addJob({
                id: products._id,
                image: products.img,
                desc: products.desc,
                price: products.price,
                color: products.colors[color],
                size: products.sizes[size],
                quantity: value,
                sale: products.sale,
            }),
        );
        toast.success('Đã thêm vào giỏ hàng');
    };

    const price = useMemo(() => {
        return products?.price.toLocaleString('vi');
    }, [products]);

    const sale = useMemo(() => {
        let x = (products?.price * products?.sale) / 100;
        return Math.floor(products?.price - x).toLocaleString('vi');
    }, [products]);

    return (
        <>
            {error ? (
                <>
                    <Loading />
                </>
            ) : loading ? (
                <Loading />
            ) : (
                <>
                    <div className={cx('wrapper')}>
                        <div className={cx('left')}>
                            <img src={products.imgs[i]} alt="brand" />
                            <div className={cx('slide')}>
                                {products.imgs &&
                                    products.imgs.length > 0 &&
                                    products.imgs.map((item, index) => (
                                        <img
                                            onMouseMove={() => setI(index)}
                                            className={cx('', {
                                                active: i === index,
                                            })}
                                            key={index}
                                            src={item}
                                            alt="brand"
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className={cx('right')}>
                            <h2>
                                <span>yêu thích</span>
                                {products.desc}
                            </h2>
                            <ul>
                                <li>
                                    <p>giá sản phẩm:</p>{' '}
                                    <span>
                                        <small>₫</small>
                                        {price}
                                    </span>
                                    <span>
                                        <small>₫</small>
                                        {sale}
                                    </span>
                                    <span>{products.sale}% giảm</span>
                                </li>
                                <li style={{ marginRight: '.4rem' }}>
                                    <p>phí vận chuyển:</p> <small>₫</small>10.000 - <small>₫</small>50.000
                                </li>
                            </ul>
                            <div className={cx('flex')}>
                                <p>màu:</p>
                                <ul>
                                    {products.colors.map((c, index) => (
                                        <li
                                            className={cx('', {
                                                active: color === index,
                                            })}
                                            key={index}
                                            onClick={() => handleColor(index)}
                                        >
                                            {c}
                                            <TiTick
                                                className={cx('icon', {
                                                    active: color === index,
                                                })}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={cx('flex')}>
                                <p>kích cỡ:</p>
                                <ul>
                                    {products.sizes.map((s, index) => (
                                        <li
                                            className={cx('', {
                                                active: size === index,
                                            })}
                                            key={index}
                                            onClick={() => handleSize(index)}
                                        >
                                            {s}
                                            <TiTick
                                                className={cx('icon', {
                                                    active: size === index,
                                                })}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={cx('amount')}>
                                <p>số lượng:</p>
                                <div className={cx('mutate')}>
                                    <button onClick={() => value > 1 && setValue(value - 1)}>
                                        <GrFormSubtract className={cx('icon')} />
                                    </button>
                                    <input
                                        type="text"
                                        name="amount"
                                        value={value}
                                        onChange={(e) =>
                                            setValue(() => {
                                                let number = e.target.value;
                                                if (number < 1) return 1;
                                                if (number > 100) return 100;
                                                return number;
                                            })
                                        }
                                    />
                                    <button onClick={() => value < 100 && setValue(value + 1)}>
                                        <AiOutlinePlus className={cx('icon')} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('select')}>
                                <button onClick={handleAddCart} className={cx('add-cart')}>
                                    <BsCartPlus />
                                    thêm vào giỏ hàng
                                </button>
                                <button onClick={handleToggle} className={cx('buy-item')}>
                                    mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                    <Delivery
                        quantity={value}
                        selectedColor={products.colors[color]}
                        selectedSize={products.sizes[size]}
                        datas={products}
                        setOpen={setOpen}
                        open={open}
                    />
                    <Comments/>
                </>
            )}
        </>
    );
};

export default InforItem;
