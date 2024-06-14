import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery ({
    baseUrl: 'http://localhost:4444/',
    prepareHeaders : (headers) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', token)
        }
        return headers
    }
})

export default baseQuery