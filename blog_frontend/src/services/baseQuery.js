import { fetchBaseQuery } from "@reduxjs/toolkit/query";
const API_URL = "https://blog-backend-m5ss.onrender.com";
const baseQuery = fetchBaseQuery ({
    baseUrl: `${API_URL}`,
    prepareHeaders : (headers) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', token)
        }
        return headers
    }
})

export default baseQuery