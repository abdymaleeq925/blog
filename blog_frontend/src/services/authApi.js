import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery.js';

const createRequest = (url, method, data) => ({
    url, method, body: data
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => createRequest('/auth/registration', 'POST', user)
        }),
        login: builder.mutation({
            query: (user) => createRequest('/auth/login', 'POST', user)
        }),
        getProfile: builder.query({
            query: () => createRequest('/auth/profile', 'GET')
        }) 
    })
})

export const { useRegisterUserMutation, useLoginMutation, useGetProfileQuery} = authApi