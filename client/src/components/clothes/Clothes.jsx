import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import Categories from './categories/Categories';
import styles from './clothes.module.scss';
import Sort from './sort/Sort';
import Products from '../product/Products';

const cx = classNames.bind(styles);

const Clothes = ({ dispatchEvent }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isHaveItems, setIsHaveItems] = useState(true);
    const { clothes } = useParams();

    return (
        <section className={cx('clothes-wrapper')}>
            <h1>
                <span></span>sản phẩm<span></span>
            </h1>
            <div className={cx('container')}>
                <Categories />
                <div className={cx('sort-clothes')}>
                    <Sort currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    <div className="products-clothes">
                        <Products
                            setIsHaveItems={setIsHaveItems}
                            dispatchEvent={dispatchEvent}
                            W={window.innerWidth > 600 ? '24%' : ''}
                            currentPage={currentPage}
                            path={`clothes/${clothes}`}
                        />
                    </div>
                </div>
            </div>
            {isHaveItems && (
                <button
                    onClick={() => {
                        if (currentPage < 8) setCurrentPage(currentPage + 1);
                    }}
                    className={cx('btn-add_view')}
                >
                    xem thêm
                </button>
            )}
        </section>
    );
};

export default Clothes;
