import React, { memo, useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import { SiGooglechat } from 'react-icons/si';
import { motion } from 'framer-motion';
import ClearIcon from '@mui/icons-material/Clear';
import { BiLoaderCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { refreshLikeComment } from '~/features/comments/commentSlice';
import styles from './comments.module.scss';
import Answer from '../answer/Answer';
import ListComments from '../list-comments/ListComments';
import { axiosComments } from '~/api/request';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);
const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
};

const Comments = () => {
    const clearRef = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [showComment, setShowComment] = useState(false);
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const { user } = useAuth();
    const { id } = useParams();
    const likes = useSelector((state) => state.comments.commentAnswers);

    if (open) {
        document.title = 'Product | Comments';
    } else {
        document.title = 'Product';
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axiosComments.get(`${id}`);
                setComments(res.data);
                setLoading(false);
            } catch (e) {
                toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
            }
        }

        async function updateLikes() {
            try {
                await axiosComments.put('updateLikes', {
                    likes,
                });
            } catch (e) {
                toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
            }
        }
        if (open) fetchData();
        else {
            updateLikes();
            dispatch(refreshLikeComment());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, open]);

    return (
        <>
            <nav className={cx('title-comment')} onClick={() => setOpen(true)}>
                <SiGooglechat />
                <span>Bình luận</span>
            </nav>
            <motion.nav
                className={cx('comments')}
                ref={clearRef}
                onClick={(e) => {
                    if (e.target === clearRef.current) setOpen(false);
                }}
                initial={{ opacity: 0 }}
                animate={
                    open
                        ? { opacity: 1 }
                        : {
                              display: 'none',
                              opacity: 0,
                              transition: {
                                  delay: 0.5,
                              },
                          }
                }
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={open ? 'open' : 'closed'}
                    variants={variants}
                    className={cx('wrapper')}
                >
                    <ClearIcon onClick={() => setOpen(false)} />
                    <h1>
                        {loading && <BiLoaderCircle />}
                        {!loading && `${comments.length} Bình luận`}
                    </h1>
                    {!loading && (
                        <>
                            <Answer
                                setComments={setComments}
                                showComment={showComment}
                                setShowComment={setShowComment}
                            />
                            {comments &&
                                comments.length > 0 &&
                                comments.map((comment, index) => (
                                    <ListComments
                                        key={comment._id}
                                        setComments={setComments}
                                        comments={comments}
                                        answer={comment.userMsg.email === user.email}
                                        data={comment}
                                    />
                                ))}
                        </>
                    )}
                </motion.div>
            </motion.nav>
        </>
    );
};

export default memo(Comments);
