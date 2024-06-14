import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import tagReducer from './tagSlice';
import { authApi } from '../services/authApi';
import { postsApi } from '../services/postsApi';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [postsApi.reducerPath]: postsApi.reducer,
        tags: tagReducer
    },
    middleware: (getDefaultMiddlewear) => (
        getDefaultMiddlewear().concat(
            authApi.middleware,
            postsApi.middleware
        )
    )
})