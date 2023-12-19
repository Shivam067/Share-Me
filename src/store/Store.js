import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlicer';
import postReducer from './PostSlicer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    }
})