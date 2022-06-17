import React, { memo, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useSearchParams, useParams } from 'react-router-dom';
import { useLiked } from '~/context/AuthReducer';

import Product from './Product';
import Loading from '../loading/Loading';
import { axiosProducts } from '~/api/request';

const Products = ({ setIsHaveItems, W, dispatchEvent, currentPage, path }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    //eslint-disable-next-line  no-unused-vars
    const [P, setP] = useSearchParams();
    const { stateLiked, dispatch } = useLiked();
    const { clothes } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosProducts.get(path, {
                    params: {
                        page: currentPage,
                        type: P.get('type'),
                        _sort: P.get('_sort'),
                    },
                });
                setLoading(false);

                if (response.data.products.length <= 0) {
                    setIsHaveItems(false);
                    if (window.innerWidth <= 768) {
                        return;
                    }
                }
                window.innerWidth > 768
                    ? setProducts(response.data.products)
                    : setProducts((prev) => {
                          if (currentPage !== P.get('page') && P.get('page') !== null) {
                              return [...prev, ...response.data.products];
                          } else {
                              return [...response.data.products];
                          }
                      });
            } catch (e) {
                setError(true);
                toast.error('Lỗi kết nối');
                console.log('error', e);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, clothes, P]);

    return (
        <>
            {error ? (
                <>
                    <Loading />
                </>
            ) : loading ? (
                <Loading />
            ) : (
                <motion.section
                    layout
                    className="products-home"
                    style={W && { justifyContent: 'space-between', padding: '0' }}
                >
                    <AnimatePresence>
                        {products.map((item, index) => (
                            <Product
                                dispatch={dispatch}
                                stateLiked={stateLiked}
                                key={index}
                                props={item}
                                W={W}
                                dispatchEvent={dispatchEvent}
                            />
                        ))}
                    </AnimatePresence>
                </motion.section>
            )}
        </>
    );
};

Products.propTypes = {
    setIsHaveItems: propTypes.func,
    W: propTypes.string,
    dispatchEvent: propTypes.func,
    currentPage: propTypes.number,
    path: propTypes.string,
};

export default memo(Products);
