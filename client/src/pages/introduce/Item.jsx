import React from 'react';
import './item.scss';
import { motion } from 'framer-motion';

const item = () => {
    return (
        <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.25 }, rotate: 5 }}
            viewport={{ once: true }}
            className="card"
        >
            <span className="like">
                <i className="bx bx-heart"></i>
            </span>
            <span className="cart">
                <i className="bx bx-cart-alt"></i>
            </span>
            <div className="card__img">
                <img src="https://yuupi.csb.app/Nike%20Zoom%20KD%2012.png" alt="" />
            </div>
            <h2 className="card__title">Nike Zoom KD 12</h2>
            <p className="card__price">$99</p>
            <div className="card__size">
                <h3>Size:</h3>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
            </div>
            <div className="card__color">
                <h3>Color:</h3>
                <span className="green"></span>
                <span className="red"></span>
                <span className="black"></span>
            </div>
            <div className="card__action">
                <a href="/home">
                    <button>Buy now</button>
                </a>
                <a href="/home">
                    <button>Add cart</button>
                </a>
            </div>
        </motion.div>
    );
};

export default item;
