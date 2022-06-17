import React, { useState, useMemo,memo } from 'react';
import './product.scss';
import propTypes from 'prop-types';
import { AiTwotoneStar, AiFillHeart, AiFillTags } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { addLiked, addJob } from '~/context/AuthActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const StarFive = [5, 4, 3, 2, 1];

const Product = ({ W, dispatchEvent, props,stateLiked, dispatch }) => {
    
    // find productId that user seleted
    const { desc, img, _id, price, sale } = props;
    const [reviews, setReviews] = useState(3);
    const handleAddCart = () => {
        dispatchEvent(
            addJob({
                id: _id,
                image: img,
                desc: desc,
                price: price,
                color: '',
                size: '',
                quantity: 1,
                sale: sale,
            }),
        );
        toast.success('Đã thêm vào giỏ hàng');
    };

    const handleLiked = () => {
        dispatch(addLiked({ id: _id }));
    };

    const priceSales = useMemo(() => {
        return Math.floor(price - (price * sale) / 100);
    }, [sale, price]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="product-home"
            style={W && { width: W }}
        >
            <div className="product-home__container">
                <Link to={`/products/${_id}`} style={{ cursor: 'pointer' }}>
                    <img src={img} alt="" />
                    <p className="item__desc">{desc}</p>
                </Link>
                <div className="item__info">
                    <div className="item__info-reviews">
                        {StarFive.map((item, index) => (
                            <AiTwotoneStar
                                key={index}
                                style={W && { fontSize: '.8rem' }}
                                onClick={() => setReviews(item)}
                                className={reviews <= item ? 'item__icon-start active' : 'item__icon-start'}
                            />
                        ))}
                    </div>
                    <p className={sale ? 'item__info-price saled' : 'item__info-price'}>{price}$</p>
                </div>

                <div className={sale ? 'item__sale active' : 'item__sale'}>
                    <span className="isSale">
                        {' '}
                        <AiFillTags style={{ color: 'orange' }} />
                        {sale}%
                    </span>
                    {sale && <p>sale:{priceSales}$</p>}
                </div>

                <div className="item__select">
                    <span>
                        <AiFillHeart
                            onClick={handleLiked}
                            className={
                                !!stateLiked.heart?.includes(_id) ? 'item__icon-heart active' : 'item__icon-heart'
                            }
                        />
                        <p>249+</p>
                    </span>
                    <button onClick={handleAddCart}>add</button>
                </div>
            </div>
        </motion.div>
    );
};

Product.propTypes = {
    W: propTypes.string,
    dispatchEvent: propTypes.func,
    props: propTypes.object,
    stateLiked: propTypes.object,
    dispatch: propTypes.func,
}

export default memo(Product);
