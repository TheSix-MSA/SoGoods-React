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
            localStorage.removeItem("userData");
            localStorage.setItem("userData",JSON.stringify(action.payload));
            return {...state,email:action.payload.email, roles: action.payload.roles, name:action.payload.name};
        },
        signout: (state, action) => {
            localStorage.clear();
            return {...initState}
        },
        loggedInUser:(state, action) => {
            return {...state,email:action.payload.email, roles: action.payload.roles, name:action.payload.name};
        }
    }
});

export const {signin,signout,loggedInUser} = loginSlice.actions;
export default loginSlice.reducer;