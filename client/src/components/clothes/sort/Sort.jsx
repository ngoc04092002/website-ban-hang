import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import {useSearchParams } from 'react-router-dom';

import styles from './sort.module.scss';

const cx = classNames.bind(styles);

const titleLists = [
    {
        title: 'Phổ biến',
        to: 'popular',
    },
    {
        title: 'mới nhất',
        to: 'newest',
    },
];
const arrange = [
    {
        title: 'Thấp đến cao',
        to: 'asc',
    },
    {
        title: 'cao đến thấp',
        to: 'desc',
    },
];

const Sort = ({ currentPage, setCurrentPage }) => {
    const [params,setParams]=useSearchParams();
    
    const [selected, setSelected] = useState(0);
    const [titleSelect, setTitleSelect] = useState('Giá');

    const handleSelectedType=(index,to)=>{
        setSelected(index);
        params.set('type',to);
        setParams(params)
    }
    
    const handleSelectedSort=(title,to)=>{
        setTitleSelect(title);
        params.set('_sort',to);
        setParams(params)
    }

    return (
        <header className={cx('sort')}>
            <span>Sắp xếp theo</span>
            <ul>
                {titleLists.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleSelectedType(index,item.to)}
                        className={cx('', {
                            active: selected === index,
                        })}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
            <div className={cx('price')}>
                <div className={cx('price-container')}>
                    <p style={{ textTransform: 'capitalize' }}>{titleSelect}</p>
                    <AiOutlineDown />
                </div>
                <ul>
                    {arrange.map((item, index) => (
                        <li
                            onClick={() => handleSelectedSort(item.title,item.to)}
                            key={index}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
            <p className={cx('page')}>
                <span>{currentPage}</span>/8
            </p>
            <button
                disabled={currentPage < 2}
                onClick={() => {
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
            >
                <AiOutlineLeft />
            </button>
            <button
                disabled={currentPage > 7}
                onClick={() => {
                    if (currentPage < 8) setCurrentPage(currentPage + 1);
                }}
            >
                <AiOutlineRight />
            </button>
        </header>
    );
};

export default Sort;
