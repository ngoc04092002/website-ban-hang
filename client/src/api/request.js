import axios from 'axios';

//api/any
export const Axios = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

//api/auth
export const axiosAuth = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/auth/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const getAuth = async (path, option = {}) => {
    const res = await axiosAuth.get(path, option);
    return res.data;
};


//api/products
export const axiosProducts = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/products/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});


//api/order
export const axiosOrder = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/order/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});


//api/comments
export const axiosComments = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/comments/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});