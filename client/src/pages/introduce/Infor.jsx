import React, { useState } from 'react';
import './introduce.scss';
import toast, { Toaster } from 'react-hot-toast';

import { Axios } from '~/api/request';

const Infor = () => {
    const [value, setValue] = useState({
        email: '',
        feedback: '',
    });

    const sendEmail = async (e) => {
        e.preventDefault();
        const res = await Axios.post('feedback', value);
        if (res.data.success) toast.success('Gửi thành công');
        else toast.error('Gửi thất bại');
    };

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section className="infor">
            <h1>Information</h1>
            <div className="infor__detail">
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.3151132667163!2d105.94646001440927!3d21.139854389353495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313507dc3522ae91%3A0x81d444fb238758e6!2zxJDhu5NuZyB0aeG6v24gxJHhu5NuZyBr4bu1IHThu6sgc8ahbiBi4bqvYyBuaW5o!5e0!3m2!1svi!2s!4v1651333274598!5m2!1svi!2s"
                    style={{ border: '2px solid black' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="infor-content">
                    <h1>feedback</h1>
                    <form onSubmit={sendEmail} style={{ width: '100%' }}>
                        <input
                            placeholder="your email"
                            type="email"
                            required
                            name="email"
                            value={value.email}
                            onChange={handleChange}
                        />
                        <textarea
                            value={value.feedback}
                            onChange={handleChange}
                            required
                            placeholder="write enter something"
                            name="feedback"
                            id="feedback"
                        ></textarea>
                        <button>send</button>
                    </form>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={true} />
        </section>
    );
};

export default Infor;
