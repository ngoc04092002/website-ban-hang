import React, { memo } from 'react';
import './card.scss';
import propTypes from 'prop-types';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { refreshJob, deleteJob } from '~/context/AuthActions';

const CardRequest = ({ title, button, id, dispatchEvent, selectBox, cardRequest, setCardRequest }) => {
    const hanleClick = () => {
        if (selectBox) dispatchEvent(refreshJob());
        else {
            dispatchEvent(deleteJob({ id }));
        }
        setCardRequest(!cardRequest);
    };

    return (
        <div className={cardRequest ? 'card__request-wrapper active' : 'card__request-wrapper'}>
            <div className="card__request">
                <AiOutlineInfoCircle />
                <p>{title}</p>
                <div className="container-btns">
                    <button onClick={() => setCardRequest(false)} className="btn__cancel">
                        hủy
                    </button>
                    <button onClick={hanleClick} className="btn__delete">
                        {button}
                    </button>
                </div>
            </div>
        </div>
    );
};

CardRequest.propTypes = {
    title: propTypes.string,
    button: propTypes.string,
    id: propTypes.string,
    dispatchEvent: propTypes.func,
    selectBox: propTypes.bool,
    cardRequest: propTypes.bool,
    setCardRequest: propTypes.func,
};

export default memo(CardRequest);
