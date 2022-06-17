import React from 'react';
import classNames from 'classnames/bind';
import styles from './updates.module.scss';

const cx = classNames.bind(styles);

const UpdatesData = [
    {
        img: 'https://vcdn1-vnexpress.vnecdn.net/2017/05/15/NewsOutSide-11-5-20170-1337-1494819087.jpeg?w=1200&h=0&q=100&dpr=1&fit=crop&s=a2XrhJ6J607chIRibVwyiQ',
        name: 'ngoc dev',
        noti: 'Vừa đặt hàng ',
        time: '1 giờ trước',
    },
    {
        img: 'https://vcdn1-vnexpress.vnecdn.net/2017/05/15/NewsOutSide-11-5-20170-1337-1494819087.jpeg?w=1200&h=0&q=100&dpr=1&fit=crop&s=a2XrhJ6J607chIRibVwyiQ',
        name: 'ngoc dev',
        noti: 'Vừa đặt hàng ',
        time: '1 giờ trước',
    },
    {
        img: 'https://vcdn1-vnexpress.vnecdn.net/2017/05/15/NewsOutSide-11-5-20170-1337-1494819087.jpeg?w=1200&h=0&q=100&dpr=1&fit=crop&s=a2XrhJ6J607chIRibVwyiQ',
        name: 'ngoc dev',
        noti: 'Vừa đặt hàng ',
        time: '1 giờ trước',
    },
];

const Updates = () => {
    return (
        <div className={cx('updates')}>
            {UpdatesData.map((update, index) => (
                <div key={index} className={cx('update')}>
                    <img src={update.img} alt="" />
                    <div className={cx('noti')} >
                        <div style={{marginBottom:'.5rem'}}>
                            <span style={{marginRight:10}}>{update.name}</span>
                            <span>{update.noti}</span>
                        </div>
                        <span>{update.time}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Updates;
