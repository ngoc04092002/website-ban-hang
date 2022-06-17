import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Products from './Products';
import './search.scss';
import SearchRegister from './SearchRegister';


const Search = () => {
    useEffect(() => {
        document.title = 'Search';
    }, []);

    const [listProducts, setListProducts] = useState([]);

    return (
        <>
            <section className="search_products-xl">
                <SearchRegister setListProducts={setListProducts} path="all" />
                {!!listProducts && listProducts.length > 0 && (
                    <motion.div layout className="list_products">
                        <AnimatePresence>
                            {listProducts.map((product, index) => (
                                <Products key={index} product={product} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>
            <section className="search_see-more"></section>
        </>
    );
};

export default Search;
