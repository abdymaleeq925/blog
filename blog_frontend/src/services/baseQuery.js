import { fetchBaseQuery } from "@reduxjs/toolkit/query";
const API_URL = "https://blog-backend-m5ss.onrender.com"; //"http://localhost:4444"
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