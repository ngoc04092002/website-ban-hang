import React from 'react';
import './introduce.scss';
import Item from './Item';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
    return (
        <div className="products">
            <h1>products</h1>
            <motion.div layout className="items">
                <AnimatePresence>
                    <Item key={0} />
                    <Item key={1} />
                    <Item key={2} />
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Products;
