import {createSlice} from "@reduxjs/toolkit";
import {getBoardData} from "./boardAsyncService";

const initState = {
    boardDtoList: [{
        bno: 0,
        title:'',
        writer:'',
        boardType: '',
        content: '',
        email: '',
        isPrivate:0,
        removed:0,
        replyCnt:0,
        modDate:'',
        regDate:''
    },],
    boardListRequestDTO:{
        page:1,
        size:0,
        keyword:'',
        type:''
    },
    pageMaker:{
        page:1,
        size:9,
        totalCount:0,
        pageList:[],
        prev:false,
        next:false
    }
}

const boardSlice = createSlice({
    name:"board",
    initialState: initState,
    reducers: {
        movePage:((state, action) => {
            return { page : action.payload }
        })
    },
    extraReducers:builder => {
        builder
            .addCase(getBoardData.pending ,(state, action) => {
                return { msg: ' 로딩중 '}
            })
            .addCase(getBoardData.fulfilled, (state, action) => {
                return  action.payload.response
            })
    }
})

export const {movePage} = boardSlice.actions
export default boardSlice.reducer