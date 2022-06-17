import React, {memo, useState } from 'react';
import styles from './categories.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineBars } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);
const categorieData = [
    { title: 'quần tây', to: '/pants' },
    { title: 'giày Dolce & Gabbana', to: '/shoes' },
    { title: 'mũ gucci', to: '/hats' },
    { title: 'áo dior', to: '/shirts' },
];

const Categories = () => {
    const location=useLocation();
    const [P, setP] = useState(()=>{
        const {pathname}=location;
        return pathname || '/pants';
    });

    
    return (
        <div className={cx('category')}>
            <h3>
                <AiOutlineBars />
                Tất cả danh mục
            </h3>
            <ul>
                {categorieData.map((item, index) => (
                    <Link key={index} to={item.to}>
                        <li
                            onClick={() => setP(item.to)}
                            className={cx('', {
                                active: item.to === P,
                            })}
                        >
                            {item.title}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default memo(Categories);
