import React, { useState, memo, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './answer.module.scss';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { axiosComments } from '~/api/request';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

const Answer = ({ Expand, data, setItems, showComment, setShowComment, answer, setComments }) => {
    const textRef = useRef(null);
    const [comment, setCommnet] = useState('');
    const { id } = useParams();
    const { user } = useAuth();

    const handleComment = async (e) => {
        if (!!comment) {
            try {
                const res = await axiosComments.post(`${id}`, {
                    parentName: !!data?.username
                        ? data.username
                        : !!data?.userMsg.username
                        ? data.userMsg.username
                        : user.username,
                    msg: comment,
                    username: user.username,
                    email: user.email,
                    answerId: data?._id || 'NOT_MAIN_COMMENT',
                });
                if (!!data?._id) {
                    setItems((prev) => [res.data, ...prev]);
                    textRef.current.childNodes[1].innerHTML = '&nbsp;';
                    setCommnet('');
                    textRef.current.focus();
                } else {
                    setComments((prev) => [res.data, ...prev]);
                    textRef.current.innerHTML = '';
                    setCommnet('');
                    textRef.current.focus();
                }
            } catch (e) {
                toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
            }
        }
    };

    return (
        <div className={cx('answer')}>
            <img
                style={answer && { width: '28px', height: '28px' }}
                src="https://res.cloudinary.com/ngocdev/image/upload/v1651162465/noAvatar_b2yp4s.png"
                alt="img"
            />
            <div className={cx('box')}>
                <div
                    ref={textRef}
                    className={cx('text')}
                    placeholder={!comment && !answer ? 'Bạn có đánh giá gì về sản phẩm?' : null}
                    role="textbox"
                    contentEditable="true"
                    aria-multiline="true"
                    spellCheck="false"
                    suppressContentEditableWarning={true}
                    tabIndex="0"
                    onFocus={() => {
                        setShowComment(true);
                    }}
                    onBlur={() => !comment && setShowComment(false)}
                    onInput={(e) => {
                        if (!!data) setCommnet(e.target.childNodes[1]?.textContent.trim());
                        else setCommnet(e.target.childNodes[0]?.textContent.trim());
                    }}
                >
                    {answer && (
                        <>
                            <span suppressContentEditableWarning={true} contentEditable="false">
                                {Expand && data.username}
                                {!Expand && data.userMsg.username}
                            </span>
                            <span>&nbsp;</span>
                        </>
                    )}
                </div>
                {showComment && (
                    <div className={cx('action')}>
                        <button onClick={() => setShowComment(false)} className={cx('cancel')}>
                            Hủy
                        </button>
                        <button
                            onClick={handleComment}
                            className={cx('comment', {
                                active: !!comment,
                            })}
                        >
                            Bình luận
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(Answer);
