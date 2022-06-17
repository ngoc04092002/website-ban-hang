import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './features/comments/commentSlice';
import authReducer from './features/fetchDatas/authSlice';

export const store = configureStore({
    reducer: {
        comments: commentsReducer,
        auth: authReducer,
    },
});
