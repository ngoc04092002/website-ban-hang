import axios from 'axios';

export const Axios = axios.create({
    baseURL: `https://backendapibanhang.herokuapp.com/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

//api/auth
export const axiosAuth = axios.create({
    baseURL: `https://backendapibanhang.herokuapp.com/auth/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const getAuth = async (path, option = {}) => {
    const res = await axiosAuth.get(path, option);
    return res.data;
};


//api/products
export const axiosProducts = axios.create({
    baseURL: `https://backendapibanhang.herokuapp.com/products/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});


//api/order
export const axiosOrder = axios.create({
    baseURL: `https://backendapibanhang.herokuapp.com/order/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});


//api/comments
export const axiosComments = axios.create({
    baseURL: `https://backendapibanhang.herokuapp.com/comments/`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});