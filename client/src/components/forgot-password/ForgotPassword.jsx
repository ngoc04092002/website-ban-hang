import React, { useState } from 'react';
import styles from './forgot-password.module.scss';
import classNames from 'classnames/bind';

import { HiOutlineMail } from 'react-icons/hi';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Axios } from '~/api/request';
import toast, { Toaster } from 'react-hot-toast';
import CheckSuccess from '~/assets/check-success.gif';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

const ForgotPassword = () => {
    const [next, setNext] = useState(false);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);

    const handleSendMail = async () => {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');

        if (!regex.test(value)) {
            toast.error('Bạn nhập sai định dạng email');
            return;
        }

        try {
            const res = await Axios.post('api-nodemail-forgot-password/sendmail', {
                sender_mail: value.trim(),
            });
            if (res.data?.success) {
                setShow(true);
                return;
            }
            toast.error('Đã có lỗi xảy ra');
        } catch (e) {
            toast.error('Đã có lỗi xảy ra');
        }
    };

    return (
        <section className={cx('forgot-password')}>
            <div className={cx('wrapper')}>
                <HiOutlineMail style={{ fontSize: 136 }} />
                <div className={cx('email')}>
                    <input
                        required
                        disabled={next && value}
                        value={value.trim()}
                        onChange={(e) => setValue(e.target.value)}
                        type="email"
                        placeholder="Your email"
                    />
                    <BsFillArrowLeftSquareFill
                        className={cx('hidden', {
                            show: next,
                        })}
                        onClick={() => {
                            value && setNext(!next);
                        }}
                    />
                    <BsFillArrowRightSquareFill
                        className={cx('', {
                            next: next,
                        })}
                        onClick={() => {
                            value && setNext(!next);
                        }}
                    />
                </div>
                {next && <button onClick={handleSendMail}>Gửi đơn</button>}

                <p>
                    You already have an account <a href="/login">login</a>
                </p>
            </div>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className={cx('send-success')}
                >
                    <div className={cx('container')}>
                        <img src={CheckSuccess} alt="check" />
                        <p>Check your mail</p>
                    </div>
                </motion.div>
            )}
            <Toaster position="top-center" reverseOrder={true} />
        </section>
    );
};

export default ForgotPassword;
