import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {act} from "react-dom/test-utils";

const initState = {
    email : "",
    roles : [],
}
const loginSlice = createSlice({
    name:"login",
    initialState:initState,
    reducers:{
        signin:(state, action) => {
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            console.log(action.payload);
            return {email:action.payload.email, roles: action.payload.roles};
        },
        signout: (state, action) => {
            localStorage.clear();
            return {...initState}
        }
    }
});

export const {signin,signout} = loginSlice.actions;
export default loginSlice.reducer;