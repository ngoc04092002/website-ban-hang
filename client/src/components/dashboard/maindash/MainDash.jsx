import React from 'react';
import classNames from 'classnames/bind';

import styles from './maindash.module.scss';
import Cards from '../carddash/Cards';
import TableDash  from '../table/Table';

const cx = classNames.bind(styles);

const MainDash = () => {
    return <div className={cx('main__dash')}>
        <h1 style={{textTransform:'capitalize'}}>Bảng điều khiển</h1>
        <Cards/>
        <TableDash/>
    </div>;
};

export default MainDash;
