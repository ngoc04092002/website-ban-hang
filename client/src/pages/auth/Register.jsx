import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { Formik, FastField, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import './register.scss';
import GIF from '~/assets/robot.gif';
import { useDispatch, useSelector } from 'react-redux';
import { postAuth, refreshDatas } from '~/features/fetchDatas/authSlice';

const validationSchema = yup.object({
    username: yup
        .string('Enter you username')
        .required('username is required')
        .trim()
        .min(4, 'username must be at least 4 characters'),
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required')
        .trim(),
    confirmPassword: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required')
        .trim()
        .oneOf([yup.ref('password'), null], 'Password is not matched'),
    gender: yup.string('Select your gender'),
});

const Register = () => {
    const dispatch = useDispatch();
    const { loading, datas, error } = useSelector((state) => state.auth);

    const handleSubmit = (values, { resetForm }) => {
        dispatch(postAuth({ path: 'register', option: values }));
        resetForm();
    };

    useEffect(() => {
        if (!!datas) {
            if (!error) {
                toast.success(datas.message, { duration: 2000 });
                dispatch(refreshDatas());
            } else {
                toast.error(datas.message);
            }
        }
    }, [error, datas, dispatch]);

    return (
        <div className="form_register">
            <h1>register</h1>
            <div className="form_register__container">
                <div className="gif">
                    <img src={GIF} alt="robot" />
                </div>
                <Formik
                    initialValues={{ username: '', password: '', email: '', confirmPassword: '', gender: 'male' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="register">
                            <label htmlFor="username">username</label>
                            <FastField
                                className={errors.username && touched.username ? 'ip error' : 'ip'}
                                id="username"
                                name="username"
                                type="text"
                            />
                            <ErrorMessage name="username" component="span" />

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

                            <label htmlFor="confirmPassword">confirm password</label>
                            <FastField
                                className={errors.confirmPassword && touched.confirmPassword ? 'ip error' : 'ip'}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                            />
                            <ErrorMessage name="confirmPassword" component="span" />
                            <ul>
                                <li>
                                    <Field checked value="male" id="male" name="gender" type="radio" />
                                    <label htmlFor="male">Male</label>
                                </li>
                                <li>
                                    <Field id="female" value="female" name="gender" type="radio" />
                                    <label htmlFor="female">Female</label>
                                </li>
                            </ul>

                            <button disabled={loading} type="submit">
                                {!loading && 'Register'}
                                {loading && 'Register...'}
                            </button>
                            <p>
                                Do you already have an account? <a href="/login">login</a>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
            <Toaster position="top-center" reverseOrder={true} />
        </div>
    );
};

Register.propTypes = {
    username: propTypes.string,
    email: propTypes.string,
    password: propTypes.string,
    confirmPassword: propTypes.string,
    gender: propTypes.string,
};

export default Register;
