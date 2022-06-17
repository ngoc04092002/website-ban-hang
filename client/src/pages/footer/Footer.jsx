import React from 'react';

import './footer.scss';

const footerDatas = [
    {
        title: 'local brand',
        datas: ['giới thiệu', 'quảng cáo', 'việc làm'],
    },
    {
        title: 'hỗ trợ',
        datas: ['bảo mật', 'quảng cáo', 'liên hệ'],
    },
    {
        title: 'công nghệ',
        datas: ['react', 'css', 'html'],
    },
];

const infoSocial = [
    {
        link: 'https://www.facebook.com/profile.php?id=100009696701104',
        img: 'https://img.icons8.com/nolan/344/facebook.png',
    },
    {
        link: 'https://www.facebook.com/profile.php?id=100009696701104',
        img: 'https://img.icons8.com/nolan/344/twitter-squared.png',
    },
    {
        link: 'https://www.facebook.com/profile.php?id=100009696701104',
        img: 'https://img.icons8.com/nolan/344/tiktok.png',
    },
];

const Footer = () => {
    return (
        <section className="footer">
            <div className="footer__top">
                <div className="footer__top_inf">
                    <h1>local brand</h1>
                    <ul>
                        <li>điện thoại: 123.456.789</li>
                        <li>
                            email: <span>vungoc23387@gmail.com</span>
                        </li>
                        <li>địa chỉ: từ sơn, bắc ninh</li>
                    </ul>
                </div>
                {footerDatas.map((item, index) => (
                    <div key={index} className="footer__top_inf">
                        <h1>{item.title}</h1>
                        <ul>
                            {item.datas.map((data, index) => (
                                <li key={index}>{data}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="footer__bottom">
                <span>© 2022-3000 All rights reserved.</span>
                <ul>
                    {infoSocial.map((item, index) => (
                        <a rel="noreferrer" key={index} href={item.link} target="_blank">
                            <li>
                                <img src={item.img} alt="iconsocial" />
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Footer;
