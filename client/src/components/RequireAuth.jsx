import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import { Axios } from '~/api/request';
import useAuth from '~/hooks/useAuth';
import Loading from '~/components/loading/Loading';

const RequireAuth = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [isLoading, setIsLoading] = useState(true);
    const [permission, setPermission] = useState(false);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const res = await Axios.get('auth/refresh');
                if (res.data.permis && !!res.data?.Infor.accessToken) {
                    setPermission(true);
                    localStorage.setItem('user', JSON.stringify(res.data.Infor));
                    setIsLoading(false);
                } else {
                    navigate('/login');
                }
            } catch (err) {
                console.err(err);
            }
        };
        verifyRefreshToken();
    }, [user, navigate]);

    return <>{!permission ? <Loading /> : isLoading ? <Loading /> : <Outlet />}</>;
};

RequireAuth.propTypes = {
    isLoading: propTypes.bool,
    permission: propTypes.bool,
    user: propTypes.object,
};

export default RequireAuth;
