import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlicer';

export const store = configureStore({
    reducer: authReducer,
})