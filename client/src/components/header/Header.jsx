import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { BsList } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { ImHome } from 'react-icons/im';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';

import Search from './Search';
import './header.scss';
import * as apiAction from '~/api/apiActions';
import useAuth from '~/hooks/useAuth';

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
};

const Header = ({ statePurchased }) => {
    const backdropRef = useRef(null);
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const [showInfo, setShowInfo] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [show, setShow] = useState(false);
    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

    const handleLogout = async () => {
        try {
            await apiAction.logOut('logout');

            setUser({});
            navigate('/');
        } catch (e) {
            console.log('logout', e);
        }
    };

    const handleBackdrop = (e) => {
        if (e.target === backdropRef.current) setToggle(!toggle);
    };


    return (
        <>
            {pathname !== 'profile' && (
                <>
                    <section className="header-home">
                        <BsList className="icon_bar" onClick={() => setToggle(!toggle)} />
                        <div className="header__left">
                            <a href="/home">
                                <img
                                    src="https://vcdn1-vnexpress.vnecdn.net/2017/05/15/NewsOutSide-11-5-20170-1337-1494819087.jpeg?w=1200&h=0&q=100&dpr=1&fit=crop&s=a2XrhJ6J607chIRibVwyiQ"
                                    alt=""
                                />
                            </a>
                            <span>Local Brand</span>
                        </div>
                        <Search />
                        <Link to="/home">
                            <ImHome className="icon_bar" />
                        </Link>
                        <div className="header__right">
                            <Link to="/cart">
                                <div className="cart">
                                    <BsCartPlus />
                                    {statePurchased.items?.length > 0 && <span>{statePurchased.items?.length}</span>}
                                </div>
                            </Link>
                            <div className="profile" onClick={() => setShowInfo(!showInfo)}>
                                <img
                                    className={showInfo ? 'active' : ''}
                                    src={
                                        user.image ||
                                        'https://res.cloudinary.com/ngocdev/image/upload/v1651162465/noAvatar_b2yp4s.png'
                                    }
                                    alt=""
                                />
                                {showInfo && (
                                    <ul>
                                        <Link to="/profile">
                                            <li>profile</li>
                                        </Link>
                                        <li onClick={handleLogout}>log out</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </section>

                    <motion.div
                        ref={backdropRef}
                        onClick={handleBackdrop}
                        className='backdrop'
                        initial={{opacity: 0}}
                        animate={
                            toggle
                                ? { opacity: 1 }
                                : {
                                      opacity: 0,
                                      transition: {
                                          delay: 0.25,
                                      },
                                      display: 'none'
                                  }
                        }
                    >
                        <motion.div initial={{opacity: 0}} animate={toggle ? 'open' : 'closed'} variants={variants} className="backdrop__bar">
                            <div className="backdrop__header">
                                <Link to="/home">
                                    <img
                                        src="https://vcdn1-vnexpress.vnecdn.net/2017/05/15/NewsOutSide-11-5-20170-1337-1494819087.jpeg?w=1200&h=0&q=100&dpr=1&fit=crop&s=a2XrhJ6J607chIRibVwyiQ"
                                        alt=""
                                    />
                                </Link>
                                <span>Local Brand</span>
                                <ImCross onClick={() => setToggle(!toggle)} className="icon__delete" />
                            </div>
                            <div className="backdrop__body">
                                <div className="backdrop__body_head">
                                    <Link to="/search">
                                        <button>search</button>
                                    </Link>
                                    <Link to="/cart">
                                        <button>cart</button>
                                    </Link>
                                    <Link to="/profile">
                                        <button>profile</button>
                                    </Link>
                                </div>
                                <div className={show ? 'backdrop__body_second active' : 'backdrop__body_second'}>
                                    <button onClick={() => setShow(!show)}>clothes</button>
                                    <ul className={show ? 'active' : ''}>
                                        <Link to="/pants">
                                            <li>pants</li>
                                        </Link>
                                        <Link to="/shoes">
                                            <li>shoes</li>
                                        </Link>
                                        <Link to="/hats">
                                            <li>hats</li>
                                        </Link>
                                        <Link to="/shirts">
                                            <li>shirts</li>
                                        </Link>
                                    </ul>
                                </div>
                                <button className="log__out" onClick={handleLogout}>
                                    log out
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
            <Outlet />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

Header.propTypes = {
    statePurchased: propTypes.object,
}

export default Header;
