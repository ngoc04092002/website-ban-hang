import React, { useState, useEffect } from 'react';
import Labels from '~/components/label/Labels';
import Slider from '~/components/slider/Slider';
import useAuth from '~/hooks/useAuth';
import Registers from './Registers';
import Products from '~/components/product/Products';
import Pagination from '~/components/pagination/Pagination';

const Home = ({ dispatchEvent }) => {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [isHaveItems, setIsHaveItems] = useState(true);


    useEffect(() => {
        document.title = 'Home';
    }, []);
    
    return (
        <>
            <Slider />
            <Labels />
            <Registers user={user} />
            <Products
                setIsHaveItems={setIsHaveItems}
                path={'_currentPage'}
                currentPage={currentPage}
                dispatchEvent={dispatchEvent}
            />
            <Pagination isHaveItems={isHaveItems} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    );
};

export default Home;
