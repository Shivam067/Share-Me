import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlicer.js';
import postReducer from './PostSlicer.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    }
})