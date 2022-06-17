import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImg from '~/assets/404.png';

const style = {
    width: '30rem',
    height: '10rem',
    margin: '0 auto',
    objectFit: 'cover',
};

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <section style={{
            marginTop:'2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <img src={NotFoundImg} alt="404" style={style} />
            <button
                style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    margin: '10px 0',
                    padding: '.4rem 2rem',
                    fontSize: '1.4rem',
                    background: '#4197fa',
                    color:'#fff'
                }}
                onClick={() => navigate('/home')}
            >
                Return
            </button>
        </section>
    );
};

export default NotFound;
