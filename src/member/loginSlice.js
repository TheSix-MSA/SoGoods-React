import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {act} from "react-dom/test-utils";

const initState = {
    accessToken:"",
    refreshToken:"",
    email : "",
    roles : [],
}
const loginSlice = createSlice({
    name:"login",
    initialState:initState,
    reducers:{
        signin:(state, action) => {
            console.log("여기는액션안");
            return action.payload;
        }
    }
});

export const {signin} = loginSlice.actions;
export default loginSlice.reducer;