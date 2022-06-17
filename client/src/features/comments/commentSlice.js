import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    commentAnswers: [],
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        toggleLikeComment: (state, action) => {
            const { _id, f_id} = action.payload;
            if (!!f_id) {
                const index = state.commentAnswers.findIndex((item) => item.f_id === f_id);
                if (index === -1) state.commentAnswers.push(action.payload);
                else state.commentAnswers.splice(index, 1);
            } else {
                const index = state.commentAnswers.findIndex((item) => item._id === _id);
                if (index === -1) state.commentAnswers.push(action.payload);
                else state.commentAnswers.splice(index, 1);
            }
        },
        refreshLikeComment: (state, action) => {
            state.commentAnswers=[];
        }
    },
});

export const { toggleLikeComment,refreshLikeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
