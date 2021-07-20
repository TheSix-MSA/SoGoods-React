import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../modules/axiosConfig";

export const getBoardData = createAsyncThunk('async/boardAsyncService', async (page) => {
    const result = await instance({
           url: `/board/FREE/list?page=${page}`,
           method: 'get'
          });
    console.log(result)
    return result.data
})

export const registerBoard = createAsyncThunk('async/boardAsyncService', async (data) => {
    const result = await instance({
        url: `/board/FREE`,
        method: 'post',
        data: data, JSON
    })
    console.log(result)
    return result.data
})
