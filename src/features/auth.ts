import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    isAuthenticated: false,
    sessionId: '',
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = typeof window !== 'undefined' ? localStorage.getItem('session_id') || '': '';
            if (typeof window !== 'undefined')
                localStorage.setItem('accountId', action.payload.id);
        },
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
