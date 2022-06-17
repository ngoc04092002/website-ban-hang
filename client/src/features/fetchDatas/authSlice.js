import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '~/api/request';
import toast from 'react-hot-toast';

//[POST]
export const postAuth = createAsyncThunk('auth/postAuth', async (authData, { rejectWithValue }) => {
    const { path, option } = authData;
    try {
        const res = await axiosAuth.post(path, option);
        return res.data;
    } catch (e) {
        toast.error('Đã có lỗi xảy ra, vui lòng thử lại',{ duration: 2000 });
    }
});

const initialState = {
    datas: null,
    loading: false,
    error: false,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        refreshDatas: (state, action) => {
            state.datas = null;
            state.error = false;
            state.loading = false;
        },
    },
    extraReducers: {
        [postAuth.pending]: (state, action) => {
            state.loading = true;
        },
        [postAuth.fulfilled]: (state, action) => {
            state.error = false;
            state.loading = false;
            state.datas = action.payload;
        },
        [postAuth.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.datas = action.payload;
        },
    },
});

export const { refreshDatas } = AuthSlice.actions;

export default AuthSlice.reducer;
