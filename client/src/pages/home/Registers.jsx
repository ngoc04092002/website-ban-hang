import React, { useState, useRef, memo } from 'react';
import './registers.scss';
import { MdOutlineFeedback } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import {
    BsEmojiAngryFill,
    BsEmojiFrownFill,
    BsFillEmojiNeutralFill,
    BsFillEmojiLaughingFill,
    BsFillEmojiHeartEyesFill,
} from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const Registers = () => {
    const handleClick = () => {
        window.scrollTo(0, 600);
    };
    const [hidden, setHidden] = useState(false);
    const [icon, setIcon] = useState(null);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_badwnib', 'template_itbweie', form.current, '0a1I0fwcrB4lMG71v').then(
            () => {
                toast.success('Sent successfully', { duration: 1000 });
            },
            () => {
                toast.error('An error occurred, please try again', { duration: 1000 });
            },
        );
    };

    return (
        <>
            <div onClick={handleClick} className="registers">
                new products
            </div>
            <div className="evaluate">
                <div onClick={() => setHidden(!hidden)} className={hidden ? 'premble hidden' : 'premble'}>
                    <MdOutlineFeedback />
                    <span>feedback</span>
                </div>
                <div className={!hidden ? 'step__1' : 'step__1 show'}>
                    <TiDelete
                        onClick={() => {
                            setHidden(!hidden);
                            setIcon('');
                        }}
                        className="feedback__delete"
                    />
                    {!icon && <h1>Do you like this service ?</h1>}
                    <div className={!icon ? 'feedback__icons' : 'feedback__icons active'}>
                        <span className={icon === 5 ? 'active' : ''}>
                            <BsEmojiAngryFill
                                onClick={() => setIcon(5)}
                                className={icon === 5 ? 'feedback__icon active' : 'feedback__icon'}
                            />
                            <p>angry</p>
                        </span>
                        <span className={icon === 1 ? 'active' : ''}>
                            <BsEmojiFrownFill
                                onClick={() => setIcon(1)}
                                className={icon === 1 ? 'feedback__icon active' : 'feedback__icon'}
                            />
                            <p>frown</p>
                        </span>
                        <span className={icon === 2 ? 'active' : ''}>
                            <BsFillEmojiNeutralFill
                                onClick={() => setIcon(2)}
                                className={icon === 2 ? 'feedback__icon active' : 'feedback__icon'}
                            />
                            <p>neutral</p>
                        </span>
                        <span className={icon === 3 ? 'active' : ''}>
                            <BsFillEmojiLaughingFill
                                onClick={() => setIcon(3)}
                                className={icon === 3 ? 'feedback__icon active' : 'feedback__icon'}
                            />
                            <p>funny</p>
                        </span>
                        <span className={icon === 4 ? 'active' : ''}>
                            <BsFillEmojiHeartEyesFill
                                onClick={() => setIcon(4)}
                                className={icon === 4 ? 'feedback__icon active' : 'feedback__icon'}
                            />
                            <p>love</p>
                        </span>
                    </div>
                    {icon && (
                        <>
                            <form ref={form} onSubmit={sendEmail} style={{ width: '100%' }}>
                                <input type="email" name="email" style={{ display: 'none' }} />
                                <textarea
                                    placeholder="write somethings"
                                    name="feedback"
                                    id="feedback"
                                    required
                                ></textarea>
                                <button>Send</button>
                            </form>
                        </>
                    )}
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    );
};

export default memo(Registers);
