import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineArrowUp } from 'react-icons/ai';

import SearchRegister from '../search/SearchRegister';
import Products from '../search/Products';

const Search = () => {
    const [listProducts, setListProducts] = useState([]);

    return (
        <div className="search-header">
            <SearchRegister setListProducts={setListProducts} path="_search" />
            {listProducts && listProducts.length > 0 && (
                <motion.div className="search_products">
                    <p
                        style={{
                            fontSize: '1rem',
                            textTransform: 'capitalize',
                            padding: '.4rem',
                            marginBottom: '.4rem',
                            borderBottom: '1px solid #ccc',
                        }}
                    >
                        <AiOutlineArrowUp /> search product
                    </p>
                    <AnimatePresence>
                        {listProducts.map((product, index) => (
                            <Products key={index} product={product} />
                        ))}
                    </AnimatePresence>
                    {listProducts && listProducts.length > 4 && (
                        <a href="/clothes" className="see-more">
                            xem thêm
                        </a>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Search;
