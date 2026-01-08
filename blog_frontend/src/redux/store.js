import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice.js';
import authReducer from './authSlice.js';
import { authApi } from '../services/authApi.js';
import { postsApi } from '../services/postsApi.js';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddlewear) => (
        getDefaultMiddlewear().concat(
            authApi.middleware,
            postsApi.middleware
        )
    )
})