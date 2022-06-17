import React, { memo, useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './list-comments.module.scss';
import propTypes from 'prop-types';
import moment from 'moment';

import ExpandAnswers from '../expandAnswer/ExpandAnswers';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsArrowReturnRight } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { toggleLikeComment } from '~/features/comments/commentSlice';
import Answer from '../answer/Answer';
import { axiosComments } from '~/api/request';
import { LikeIcon } from '~/assets/icons';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);
const showLimitLike = 100;

const ListComments = ({
    prevData,
    prevSetData,
    comments,
    setComments,
    Expand = false,
    data,
    answer = false,
    username,
    parentName,
}) => {
    const { user } = useAuth();
    const aRef = useRef(null);
    const [showAnswers, setShowAnswers] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [answersData, setAnswersData] = useState(data);
    const [showText, setShowText] = useState(false);
    const [height, setHeight] = useState(0);
    const [items, setItems] = useState([]);
    const [isLike, setisLike] = useState({
        isLiked: Expand ? data.likes.includes(user.accessToken) : data.userMsg.likes.includes(user.accessToken),
        likes: Expand ? data.likes.length : data.userMsg.likes.length,
    });
    const dispatch = useDispatch();

    const handleRemoveComment = async () => {
        try {
            const res = await axiosComments.delete(`${data._id}/${data?.f_id}`);

            if (res.data.success) {
                if (!!data.f_id) {
                    if (prevData.userMsg?.answers.length > 0) {
                        const findedId = prevData.userMsg?.answers.findIndex((item) => item.f_id === data.f_id);
                        if (findedId !== -1) prevData.userMsg.answers.splice(findedId, 1);
                        const newData = { ...prevData };
                        prevSetData(newData);
                    } else {
                        const newItems = prevData.filter((item) => item.f_id !== data.f_id);
                        prevSetData(newItems);
                    }
                } else {
                    const newComments = comments.filter((comment) => data._id !== comment._id);
                    setComments(newComments);
                }
            }
        } catch (e) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };

    const handleLike = () => {
        dispatch(
            toggleLikeComment({
                _id: data._id,
                f_id: data.f_id,
                userId: user.accessToken,
            }),
        );
        if (isLike.isLiked)
            setisLike({
                isLiked: false,
                likes: isLike.likes - 1,
            });
        else
            setisLike({
                isLiked: true,
                likes: isLike.likes + 1,
            });
    };

    useEffect(() => {
        setHeight(aRef.current.clientHeight);
    }, []);

    return (
        <>
            <nav
                className={cx('list-comment', {
                    answer: answer,
                })}
            >
                <img src="https://res.cloudinary.com/ngocdev/image/upload/v1651162465/noAvatar_b2yp4s.png" alt="" />
                <div className={cx('comment_body')}>
                    <div
                        ref={aRef}
                        className={cx('comment_in', {
                            answer: answer,
                            show_text: showText,
                        })}
                    >
                        <p
                            className={cx('', {
                                show_text: showText,
                            })}
                        >
                            <span
                                style={{
                                    whiteSpace: 'nowrap',
                                    textDecoration: 'none',
                                    cursor: 'default',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                }}
                            >
                                {!!parentName ? parentName : username}
                            </span>
                            {Expand && data.msg}
                            {!Expand && !!data && data.userMsg.msg}
                        </p>
                        {!showText && height > 140 && (
                            <div className={cx('expand_text')}>
                                <span
                                    className={cx('', {
                                        text: answer,
                                    })}
                                    onClick={() => setShowText(!showText)}
                                >
                                    xem thêm
                                </span>
                            </div>
                        )}
                        {isLike.likes > 0 && (
                            <div
                                className={cx('reactions', {
                                    answer: answer,
                                })}
                            >
                                <img src={LikeIcon} alt="like" />
                                {isLike.likes < showLimitLike ? isLike.likes : '10+'}
                            </div>
                        )}
                        {answer && (
                            <p className={cx('expand')}>
                                <BiDotsHorizontalRounded style={{ fontSize: '28px', cursor: 'pointer' }} />
                                <span onClick={handleRemoveComment}>Xóa</span>
                            </p>
                        )}
                    </div>
                    <p
                        className={cx('', {
                            answer: answer,
                        })}
                    >
                        <span onClick={handleLike}>Thích</span>
                        <span onClick={() => setShowComment(true)}>Phản hồi</span>
                        <span>
                            {moment(data?.createdAt).format('L')},{moment(data?.createdAt).format('LT')}
                        </span>
                    </p>
                    {showComment && (
                        <Answer
                            Expand={Expand}
                            setItems={setItems}
                            data={data}
                            answer={true}
                            showComment={showComment}
                            setShowComment={setShowComment}
                        />
                    )}
                </div>
            </nav>
            {!!data?.userMsg && !showAnswers && data?.userMsg.answers.length > 0 && (
                <p onClick={() => setShowAnswers(!showAnswers)} className={cx('open_comments')}>
                    <BsArrowReturnRight />
                    <span>xem {data?.userMsg.answers.length} phản hồi</span>
                </p>
            )}
            {!showAnswers && items.length === 0 ? null : (
                <ExpandAnswers setItems={setItems} items={items} data={answersData} setAnswersData={setAnswersData} />
            )}
        </>
    );
};

ListComments.propTypes = {
    answer: propTypes.bool,
    data: propTypes.object,
    prevData: propTypes.any,
    prevSetData: propTypes.func,
    setItems: propTypes.func,
    setAnswersData: propTypes.func,
    comments: propTypes.array,
    setComments: propTypes.func,
    user: propTypes.object,
    setisLike: propTypes.func,
    isLike: propTypes.object,
    showLimitLike: propTypes.number,
    showText: propTypes.bool,
    setShowText: propTypes.func,
    setShowAnswers: propTypes.func,
    showAnswers: propTypes.bool,
    Expand: propTypes.bool,
};

export default memo(ListComments);
