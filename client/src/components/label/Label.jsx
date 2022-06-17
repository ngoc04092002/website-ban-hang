import React from 'react';
import './label.scss';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Label = ({ img, name }) => {
    return (
        <div className="label">
            <Link to={`/${name}`}>
                <img src={img} alt="img" />
            </Link>
            <span>{name}</span>
        </div>
    );
};

Label.propTypes = {
    img: propTypes.string,
    name: propTypes.string,
};

export default Label;
