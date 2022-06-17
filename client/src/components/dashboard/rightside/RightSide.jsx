import React from 'react';
import classNames from 'classnames/bind';
import styles from './rightside.module.scss';
import Updates from '../updates/Updates';
import CustomerReiview from '../customerreview/CustomerReiview';

const cx = classNames.bind(styles);

const RightSide = () => {
    return (
        <div className={cx('right-side')}>
            <div>
                <h3>Những cập nhật</h3>
                <Updates />
            </div>
            <div>
                <h3 style={{marginTop:'2rem'}}>Đánh giá của khách hàng</h3>
                <CustomerReiview/>
            </div>
        </div>
    );
};

export default RightSide;
