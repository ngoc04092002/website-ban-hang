const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        itemId: {
            type: String,
        },
        userMsg: {
            msg:{
                type: String,
            },
            parentName:{
                type: String,
            },
            username:{
                type: String,
            },
            email:{
                type: String,
            },
            answers:{
                type: Array,
            },
            likes:{
                type: Array,
            }
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Comment', CommentSchema);
