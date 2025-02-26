import { fetchBaseQuery } from "@reduxjs/toolkit/query";
const LOCAL_API_URL = "http://localhost:4444";
const RENDER_API_URL = "https://blog-backend-m5ss.onrender.com";

const baseQuery = fetchBaseQuery ({
    baseUrl: `${RENDER_API_URL}`,
    prepareHeaders : (headers) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', token)
        }
        return headers
    }
})

export default baseQuery