const Comments = require('../models/Comments');
const { v4: uuidv4 } = require('uuid');

var getAllMsg = async (req, res, next) => {
    const id = req.params.id;
    try {
        const comments = await Comments.find({ itemId: id }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (e) {
        next(e);
    }
};

var createComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const answerId = req.body.answerId;
        let comments;
        if (answerId !== 'NOT_MAIN_COMMENT') {
            const answer = await Comments.findOne({ _id: answerId });

            answer.userMsg.answers.push({
                f_id: uuidv4(),
                parentName: req.body.parentName,
                msg: req.body.msg,
                username: req.body.username,
                email: req.body.email,
                _id: answerId,
                likes: [],
                createdAt: new Date(),
            });
            await answer.save();
            res.status(200).json({
                f_id: uuidv4(),
                parentName: req.body.parentName,
                msg: req.body.msg,
                username: req.body.username,
                email: req.body.email,
                _id: answerId,
                likes: [],
                createdAt: new Date(),
            });
        } else {
            comments = await Comments.create({ itemId: id, userMsg: req.body });
            res.status(200).json(comments);
        }
    } catch (e) {
        next(e);
    }
};

var removeComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const itemId = req.params.itemId;
        if (itemId === 'undefined') {
            await Comments.findOneAndDelete({ _id: id });
        } else {
            const answer = await Comments.findOne({ _id: id });
            const findedId = answer.userMsg.answers.findIndex((item) => item.f_id === itemId);
            if (findedId !== -1) answer.userMsg.answers.splice(findedId, 1);
            await answer.save();
        }
        res.status(200).json({ success: true });
    } catch (e) {
        next(e);
    }
};

var updateLike = async (req, res, next) => {
    try {
        const likesLen = req.body.likes.length;
        const data = req.body.likes;
        for (let i = 0; i < likesLen; i++) {
            const answer = await Comments.findOne({ _id: data[i]._id });
            if (!!data[i]?.f_id) {
                const findedId = answer.userMsg.answers.findIndex((item) => item.f_id === data[i].f_id);
                if (findedId !== -1) {
                    answer.userMsg.answers[findedId].likes.splice(findedId, 1);
                } else {
                    answer.userMsg.answers[findedId].likes.push(data[i].username);
                }
            } else {
                const isHave = answer.userMsg.likes.findIndex((userId) => userId === data[i].userId);
                if (isHave !== -1) {
                    answer.userMsg.likes.splice(isHave, 1);
                } else {
                    answer.userMsg.likes.push(data[i].userId);
                }
            }
            await answer.save();
        }
        return res.status(200).json({ success: true });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllMsg,
    createComment,
    removeComment,
    updateLike,
};
