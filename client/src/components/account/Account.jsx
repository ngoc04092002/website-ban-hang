import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './account.module.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BiError } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import Axios from 'axios';

import Loading from '../loading/Loading';
import useAuth from '~/hooks/useAuth';
import { axiosAuth } from '~/api/request';

const cx = classNames.bind(styles);

const SignupSchema = yup.object().shape({
    username: yup.string().max(50, 'Tên quá dài'),
    email: yup.string().email('email không hợp lệ'),
    image: yup.string().url('url không hợp lệ'),
    password: yup.string(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
});

const Lis = [
    {
        title: 'username',
        vn: 'Tên tài khoản',
        type: 'text',
    },
    {
        title: 'email',
        vn: 'email',
        type: 'text',
    },
    {
        title: 'password',
        vn: 'Mật khẩu',
        type: 'password',
    },
    {
        title: 'confirmPassword',
        vn: 'Xác nhận mật khẩu',
        type: 'password',
    },
];

const Account = () => {
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useAuth();
    const [image, setImage] = useState({
        url: '',
        preview: user.image || 'https://res.cloudinary.com/ngocdev/image/upload/v1651162465/noAvatar_b2yp4s.png',
    });

    const [show, setShow] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    //hidden password
    const [hidden, setHidden] = useState({
        password: false,
        confirmPassword: false,
    });

    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
        reset,
        clearErrors,
    } = useForm({
        defaultValues: {
            username: user.username,
            email: user.email,
            image: user.image,
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(SignupSchema),
    });

    const onSubmit = (data) => {
        setLoading(true);
        const { username, email, password, confirmPassword } = data;
        if (
            username === user.username &&
            email === user.email &&
            password === '' &&
            confirmPassword === '' &&
            image.url === ''
        ) {
            toast.info('Vui lòng nhập thông tin');
            setLoading(false);
            return;
        }

        let lenPassword = password.trim().length;
        if (lenPassword) {
            if (lenPassword < 6) {
                setError('password', { message: 'Mật khẩu phải có ít nhất 6 ký tự' });
                return;
            }
        }

        //upload image
        if (image.url) {
            const formData = new FormData();
            formData.append('file', image.url);
            formData.append('upload_preset', 'vxmrd4x5');

            Axios.post('https://api.cloudinary.com/v1_1/ngocdev/image/upload', formData)
                .then(async (data) => {
                    const { url } = data.data;
                    const res = await axiosAuth.put(`update/${user.accessToken}`, {
                        url,
                        username: username.trim(),
                        email: email.trim(),
                        password: password.trim(),
                    });
                    if (res.data.success) {
                        toast.success('Cập nhật thành công');
                        setUser({
                            ...user,
                            email: res.data.user.email,
                            username: res.data.user.username,
                            image: url,
                        });
                    } else toast.error('Thông tin không chính xác');
                    setLoading(false);
                })
                .catch((e) => {
                    toast.error('Lỗi khi upload ảnh');
                });
        } else {
            async function fetch() {
                try {
                    const res = await axiosAuth.put(`update/${user.accessToken}`, {
                        username: username.trim(),
                        email: email.trim(),
                        password: password.trim(),
                    });
                    setLoading(false);
                    if (res.data.success) {
                        toast.success('Cập nhật thành công');
                        setUser({
                            ...user,
                            email: res.data.user.email,
                            username: res.data.user.username,
                        });
                    } else toast.error('Thông tin không chính xác');
                } catch (e) {
                    toast.error('Lỗi khi cập nhật');
                }
            }
            fetch();
        }

        reset();
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage({
            url: file,
            preview: file.preview,
        });
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    return (
        <>
            <section className={cx('account')}>
                <h1>Tài khoản</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={cx('account-container')}>
                    <div className={cx('account-wrapper')}>
                        <div className={cx('account-left')}>
                            <ul>
                                {Lis.map((item, index) => (
                                    <li key={index}>
                                        <label htmlFor={item.title}>
                                            {item.vn}:{' '}
                                            {!show[item.title] && (
                                                <span>{item.type === 'password' ? '******' : user[item.title]}</span>
                                            )}
                                        </label>
                                        {show[item.title] && (
                                            <div className={cx('input')}>
                                                <input
                                                    type={
                                                        item.type === 'password'
                                                            ? hidden[item.title]
                                                                ? 'text'
                                                                : 'password'
                                                            : 'text'
                                                    }
                                                    className={cx('', {
                                                        error: errors[item.title],
                                                    })}
                                                    id={item.title}
                                                    {...register(item.title)}
                                                />
                                                {item.type === 'password' &&
                                                    (!hidden[item.title] ? (
                                                        <AiOutlineEyeInvisible
                                                            onClick={() =>
                                                                setHidden((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        [item.title]: !prev[item.title],
                                                                    };
                                                                })
                                                            }
                                                        />
                                                    ) : (
                                                        <AiOutlineEye
                                                            onClick={() =>
                                                                setHidden((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        [item.title]: !prev[item.title],
                                                                    };
                                                                })
                                                            }
                                                        />
                                                    ))}
                                                <ErrorMessage
                                                    errors={errors}
                                                    name={item.title}
                                                    render={({ message }) => (
                                                        <p>
                                                            <BiError /> {message}
                                                        </p>
                                                    )}
                                                />
                                            </div>
                                        )}
                                        <span
                                            onClick={() => {
                                                clearErrors(item.title);
                                                setShow((prev) => {
                                                    return {
                                                        ...prev,
                                                        [item.title]: !prev[item.title],
                                                    };
                                                });
                                            }}
                                        >
                                            {show[item.title] ? 'hủy' : 'sửa đổi'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                <li>
                                    <label htmlFor="male">Nam</label>
                                    <input id="male" defaultChecked {...register('gender')} type="radio" value="Male" />
                                </li>
                                <li>
                                    <label htmlFor="female">Nữ</label>
                                    <input id="female" {...register('gender')} type="radio" value="Female" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    {loading && <Loading />}
                    {!loading && <button className={cx('update')}>Thay đổi</button>}
                </form>
            </section>
            <section className={cx('account-right')}>
                <h1>Tài khoản</h1>
                <img src={image.preview} alt="avatar" />
                <label htmlFor="file">
                    <input id="file" type="file" name="image" onChange={handleAvatar} />
                    <span>Chọn Ảnh</span>
                </label>
            </section>
        </>
    );
};

export default Account;
