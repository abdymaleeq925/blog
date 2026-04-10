import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_URL } from "../utils/constants.js";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQuery;