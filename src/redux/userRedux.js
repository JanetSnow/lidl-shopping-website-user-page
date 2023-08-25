import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser : null,
        isRegistered: false,
        isFetching: false,
        error: false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess:(state,action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) =>{
            state.isFetching = false;
            state.currentUser = null;
            state.isRegistered = false;
            state.error = false;
        },
        registerStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        registerSuccess:(state)=>{
            state.isFetching = false;
            state.isRegistered = true;
            state.error = false;
        },
        registerFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { loginStart,loginSuccess,loginFailure,logOut,registerStart,registerSuccess,registerFailure} = userSlice.actions;
export default userSlice.reducer;