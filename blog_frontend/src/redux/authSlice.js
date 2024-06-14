import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        data: null
    },
    reducers: {
        setAuthState: (state, action) => {
            state.isLoggedIn =  action.payload.isLoggedIn;
            state.data = action.payload.data;
        },
        setLogOut: (state) => {
            state.isLoggedIn = false;
            state.data = null;
        },
    }
});

export const { setAuthState, setLogOut } = authSlice.actions;

export default authSlice.reducer;