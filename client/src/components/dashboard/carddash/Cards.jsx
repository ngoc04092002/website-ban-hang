import React from 'react';
import classNames from 'classnames/bind';
import { IoLogoUsd } from 'react-icons/io';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { BsClipboardData } from 'react-icons/bs';

import styles from './cards.module.scss';
import Carddash from '../Card/Carddash';

const cx = classNames.bind(styles);
const CardsData = [
    {
        title: 'bán hàng',
        color: {
            backGround: 'linear-gradient(180deg,#bb67ff 0%, #c484f3 100%)',
            boxShadow: '0 10px 20px 0 #e0c6f5',
        },
        barValue: 70,
        value: '99,999',
        png: IoLogoUsd,
        series: [
            {
                name: 'bán hàng',
                data: [31, 40, 28, 51, 42, 47, 100],
            },
        ],
    },
    {
        title: 'doanh thu',
        color: {
            backGround: 'linear-gradient(180deg,#ff919d 0%, #fc929d 100%)',
            boxShadow: '0 10px 20px 0 #fdc0c7',
        },
        barValue: 80,
        value: '99,999',
        png: RiMoneyDollarBoxLine,
        series: [
            {
                name: 'doanh thu',
                data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },
    {
        title: 'chi phí',
        color: {
            backGround: 'linear-gradient(rgb(248,212,154) -146.22%, rgb(255,202,113) -46.22%)',
            boxShadow: '0 10px 20px 0 #f9d59b',
        },
        barValue: 60,
        value: '99,999',
        png: BsClipboardData,
        series: [
            {
                name: 'chi phí',
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
];

const Cards = () => {
    return (
        <div className={cx('cards')}>
            {CardsData.map((card, index) => (
                <div key={index} className={cx('parent-container')}>
                    <Carddash
                        title={card.title}
                        color={card.color}
                        barValue={card.barValue}
                        value={card.value}
                        png={card.png}
                        series={card.series}
                    />
                </div>
            ))}
        </div>
    );
};

export default Cards;
