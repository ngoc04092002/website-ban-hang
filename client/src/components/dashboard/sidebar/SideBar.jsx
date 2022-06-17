import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdProductionQuantityLimits, MdLaptopChromebook } from 'react-icons/md';
import { BiBookAdd } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMdReturnLeft } from 'react-icons/io';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import * as apiAction from '~/api/apiActions';
import useAuth from '~/hooks/useAuth';
import styles from './sidebar.module.scss';

const cx = classNames.bind(styles);
const Datas = [
    {
        icon: AiOutlineHome,
        heading: 'Bảng điều khiển',
        to: '',
    },
    {
        icon: BsFillPersonFill,
        heading: 'Sửa thông tin',
        to: '/account',
    },
    {
        icon: MdProductionQuantityLimits,
        heading: 'Sản phẩm',
        to: '/product',
    },
    {
        icon: BiBookAdd,
        heading: 'Đăng sản phẩm',
        to: '/post',
    },
    {
        icon: MdLaptopChromebook,
        heading: 'Đơn hàng',
        to: '/order',
    },
];

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const name = pathname.slice(8);

    const { setUser } = useAuth();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = async () => {
        try {
            await apiAction.logOut('logout');
            setUser({});
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };
    const sidebarVariants = {
        true: {
            left: '0',
        },
        false: {
            left: '-100%',
        },
    };

    return (
        <>
            <div
                onClick={() => setExpanded(!expanded)}
                className={cx('bars')}
                style={expanded ? { left: '60%' } : { left: '5%' }}
            >
                <span
                    className={cx('', {
                        active: expanded,
                    })}
                ></span>
                <span
                    className={cx('', {
                        active: expanded,
                    })}
                ></span>
                <span
                    className={cx('', {
                        active: expanded,
                    })}
                ></span>
            </div>
            <motion.div
                className={cx('side__bar')}
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                <Link to="/home" className={cx('logo')}>
                    <img
                        src="https://vcdn1-vnexpress.vnecdn.net/2017/05/15/NewsOutSide-11-5-20170-1337-1494819087.jpeg?w=1200&h=0&q=100&dpr=1&fit=crop&s=a2XrhJ6J607chIRibVwyiQ"
                        alt="brand"
                    />
                    <span>brand</span>
                </Link>
                <Link to="/home" className={cx('back-home')}>
                    <IoMdReturnLeft />
                </Link>
                <div className={cx('menu')}>
                    {Datas.map((item, index) => (
                        <Tippy key={index} content={item.heading}>
                            <Link
                                to={`/profile${item.to}`}
                                className={cx('menu-item', {
                                    active: item.to === name,
                                })}
                            >
                                <item.icon />
                                <span>{item.heading}</span>
                            </Link>
                        </Tippy>
                    ))}
                    <div onClick={handleLogout} className={cx('menu-item')}>
                        <FiLogOut />
                        <span>Đăng xuất</span>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default SideBar;
