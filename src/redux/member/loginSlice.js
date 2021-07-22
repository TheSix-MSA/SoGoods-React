import {createSlice} from "@reduxjs/toolkit";

const initState = {
    email : "",
    roles : [],
    name: ""
}
const loginSlice = createSlice({
    name:"login",
    initialState:initState,
    reducers:{
        signin:(state, action) => {
            localStorage.setItem("userData", action.payload);
            console.log(action.payload);
            return {email:action.payload.email, roles: action.payload.roles, name:action.payload.name};
        },
        signout: (state, action) => {
            localStorage.clear();
            return {...initState}
        }
    }
});

export const {signin,signout} = loginSlice.actions;
export default loginSlice.reducer;