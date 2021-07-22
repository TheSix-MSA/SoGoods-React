import {createSlice} from "@reduxjs/toolkit";
import {getBoardData, getSearchData} from "./boardAsyncService";

const initState = {
    boardDtoList: [{
        bno: 0,
        title: '',
        writer: '',
        boardType: '',
        content: '',
        email: '',
        isPrivate: 0,
        removed: 0,
        replyCnt: 0,
        modDate: '',
        regDate: ''
    },],
    boardListRequestDTO: {
        page: 1,
        size: 0,
        keyword: '',
        type: ''
    },
    pageMaker: {
        page: 1,
        size: 9,
        totalCount: 0,
        pageList: [],
        prev: false,
        next: false,
        start: 0,
        end: 0
    }
}

const boardSlice = createSlice({
    name: "board",
    initialState: initState,
    reducers: {
        movePage: ((state, action) => {
            state.pageMaker.page = action.payload
        }),
        prevPage: ((state, action) => {
            state.pageMaker.page = action.payload - 1
        }),
        nextPage: ((state, action) => {
            state.pageMaker.page = action.payload + 1
        })
    },
    extraReducers: builder => {
        builder
            .addCase(getBoardData.pending, (state, action) => {
                return {...state}
            })
            .addCase(getBoardData.fulfilled, (state, action) => {
                return {...action.payload.response}
            })
    },

})

export const {movePage, nextPage, prevPage} = boardSlice.actions
export default boardSlice.reducer