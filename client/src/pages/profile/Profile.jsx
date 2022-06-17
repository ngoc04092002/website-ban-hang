import React, { useEffect} from 'react';
import classNames from 'classnames/bind';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './profile.module.scss';
import SideBar from '~/components/dashboard/sidebar/SideBar';
import MainDash from '~/components/dashboard/maindash/MainDash';
import RightSide from '~/components/dashboard/rightside/RightSide';

const cx = classNames.bind(styles);

const Profile = () => {
    useEffect(() => {
        document.title = 'Profile';
    }, []);

    const location = useLocation();
    const { pathname } = location;
    const len = pathname.split('/').length;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('profile-glass')}>
                    <SideBar />
                    {len > 2 ? (
                        <Outlet />
                    ) : (
                        <>
                            <MainDash />
                            <RightSide />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
