import { useContext, useEffect } from 'react';
import queryString from 'query-string';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify({ ...params }),
});

const useAxiosPrivate = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const requestIntercept = axiosClient.interceptors.request.use(
            (config) => {
                // if (!config.headers['authorization']) {
                //     config.headers['authorization'] = `Bearer ${user?.accessToken}`;
                // }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = axiosClient.interceptors.response.use(
            (response) => {
                if (response && response.data) {
                    return response.data;
                }
                return response;
            },
            async (error) => {
                return Promise.reject(error);
            },
        );

        return () => {
            axiosClient.interceptors.request.eject(requestIntercept);
            axiosClient.interceptors.response.eject(responseIntercept);
        };
    }, [user]);

    return axiosClient;
};

export default useAxiosPrivate;
