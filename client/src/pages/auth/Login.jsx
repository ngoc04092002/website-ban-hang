import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { Formik, FastField, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import GIF from '~/assets/robot.gif';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import './register.scss';
import { signInWithGoole, signInWithFacebook } from './firebase';
import useAuth from '~/hooks/useAuth';
import { AuthFacebookSvg, AuthGoogleSvg } from '~/assets/icons';
import { refreshJob } from '~/context/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { postAuth, refreshDatas } from '~/features/fetchDatas/authSlice';

const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required').trim(),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required')
        .trim(),
});

const Login = ({ dispatchEvent }) => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const dispatch = useDispatch();
    const { datas, error } = useSelector((state) => state.auth);

    const handleSubmit = (values, { resetForm }) => {
        dispatch(postAuth({ path: 'login', option: values }));
        resetForm();
    };

    useEffect(() => {
        if (!!datas) {
            if (!error) {
                if (datas.newInfor.email !== user?.email) {
                    dispatchEvent(refreshJob());
                    setUser(datas.newInfor);
                    navigate('/home');
                } else navigate('/home');
                dispatch(refreshDatas());
            } else {
                toast.error(datas.message);
            }
        }
    }, [error, datas, dispatch, dispatchEvent, setUser, user, navigate]);

    return (
        <div className="form_register">
            <h1>login</h1>
            <div className="form_register__container">
                <div className="gif">
                    <img src={GIF} alt="robot" />
                </div>
                <Formik
                    initialValues={{ password: '', email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="register">
                            <label htmlFor="email">email</label>
                            <FastField
                                className={errors.email && touched.email ? 'ip error' : 'ip'}
                                id="email"
                                name="email"
                                type="email"
                            />
                            <ErrorMessage name="email" component="span" />

                            <label htmlFor="password">password</label>
                            <FastField
                                className={errors.password && touched.password ? 'ip error' : 'ip'}
                                id="password"
                                name="password"
                                type="password"
                            />
                            <ErrorMessage name="password" component="span" />

                            <button type="submit">Login</button>
                            <div className="auth__social">
                                <div onClick={() => signInWithGoole(setUser, user, dispatchEvent)} className="auth">
                                    <AuthGoogleSvg />
                                    <p>Google</p>
                                </div>
                                <div className="auth" onClick={() => signInWithFacebook(setUser, user, dispatchEvent)}>
                                    <AuthFacebookSvg />
                                    <p>Facebook</p>
                                </div>
                            </div>
                            <a href="/forgot-password">Forgot Password?</a>
                            <p>
                                Do you already have an account? <a href="/register">register</a>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
            <Toaster position="top-center" reverseOrder={true} />
        </div>
    );
};

Login.propTypes = {
    dispatchEvent: propTypes.func.isRequired,
    email: propTypes.string,
    password: propTypes.string,
};

export default Login;
