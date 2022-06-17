import React from 'react';
import Header from './Header';
import Infor from './Infor';
import './introduce.scss';
import Products from './Products';

const Introduce = () => {
    return (
        <div className="introduce">
            <Header />
            <Products />
            <Infor />
        </div>
    );
};

export default Introduce;
