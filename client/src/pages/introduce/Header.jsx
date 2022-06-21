import React from 'react';
import './introduce.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <>
            <section className="header">
                <div className="header__right">
                    <img
                        src="https://vcdn1-vnexpress.vnecdn.net/2017/05/15/NewsOutSide-11-5-20170-1337-1494819087.jpeg?w=1200&h=0&q=100&dpr=1&fit=crop&s=a2XrhJ6J607chIRibVwyiQ"
                        alt=""
                    />
                    <span>Local Brand</span>
                </div>
                <div className="header__left">
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            </section>
            <div className="bg-brand">
                <div>
                    <p>Chào mừng bạn đã đến với chúng tôi by Ngọc Văn ^_^</p>
                    <a href="/home">
                        <motion.button
                            style={{ marginRight: 0 }}
                            initial={{ x: -110, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: 'all 0.5s ease-in-out',
                            }}
                        >
                            xem thêm
                        </motion.button>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Header;
