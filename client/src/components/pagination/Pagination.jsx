import React, { memo, useTransition, useEffect } from 'react';
import propTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';

import './pagination.scss';

const array = [1, 2, 3, 4, 5, 6, 7, 8];

const Pagination = ({ isHaveItems, currentPage, setCurrentPage }) => {
    const [isPending, startTransition] = useTransition();
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        setParams({ page: currentPage });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            params.set('page', currentPage - 1);
            setParams(params);
        }
    };
    const handleNextPage = () => {
        if (currentPage < 8) {
            setCurrentPage(currentPage + 1);
            params.set('page', currentPage + 1);
            setParams(params);
        }
    };

    const handleSeeMore = () => {
        if (currentPage < 7) startTransition(() => setCurrentPage(currentPage + 1));
    };

    return (
        <section className="pagination__wrapper">
            {isHaveItems && (
                <Link
                    onClick={handleSeeMore}
                    to={`_currentPage?page=${currentPage + 1}`}
                    className={!isPending ? 'pc pagination__number active' : 'pc pagination__number'}
                >
                    xem thêm
                </Link>
            )}

            <div className="smart">
                <button onClick={handlePrevPage} className={currentPage === 1 ? 'icon__dir disabled' : 'icon__dir'}>
                    &#8249;
                </button>
                {array.map((item, index) => (
                    <Link
                        to={`_currentPage?page=${item}`}
                        key={index}
                        onClick={() => setCurrentPage(item)}
                        className={currentPage === item ? 'pagination__number active' : 'pagination__number'}
                    >
                        {item}
                    </Link>
                ))}
                <button onClick={handleNextPage} className={currentPage === 8 ? 'icon__dir disabled' : 'icon__dir'}>
                    &#8250;
                </button>
            </div>
        </section>
    );
};

Pagination.propTypes = {
    isHaveItems: propTypes.bool,
    currentPage: propTypes.number,
    setCurrentPage: propTypes.func,
};

export default memo(Pagination);
