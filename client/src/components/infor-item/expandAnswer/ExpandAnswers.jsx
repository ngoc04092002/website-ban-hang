import React, { memo } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './expand-anwser.module.scss';

import ListComments from '../list-comments/ListComments';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

const ExpandAnswers = ({ setAnswersData, setItems, items, data }) => {
    const { user } = useAuth();


    return (
        <div style={!!data.f_id ? { margin: '10px 0' } : { margin: '10px 40px' }} className={cx('expand_answer')}>
            {items.length > 0 &&
                items.map((item, index) => (
                    <ListComments
                        Expand
                        prevSetData={setItems}
                        prevData={items}
                        parentName={item.parentName}
                        data={item}
                        key={item.f_id}
                        username={item.username}
                        answer={user.email === item.email}
                    />
                ))}
            {data.userMsg?.answers.map((item, index) => (
                <ListComments
                    parentName={item.parentName}
                    Expand
                    prevData={data}
                    prevSetData={setAnswersData}
                    data={item}
                    key={item.f_id}
                    username={item.username}
                    answer={user.email === item.email}
                />
            ))}
        </div>
    );
};

ExpandAnswers.propTypes = {
    setAnswersData: propTypes.func,
    setItems: propTypes.func,
    items: propTypes.array,
    data: propTypes.object,
};

export default memo(ExpandAnswers);
