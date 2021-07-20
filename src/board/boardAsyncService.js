import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../modules/axiosConfig";

/*
    FREE 게시판의 모든 데이터를 가져옴
 */
export const getBoardData = createAsyncThunk('async/boardAsyncService', async (page) => {
    const result = await instance({
           url: `/board/FREE/list?page=${page}`,
           method: 'get'
          });
    console.log(result)
    return result.data
})

/*
    FREE 게시판 글작성(미완)
 */
export const registerBoard = createAsyncThunk('async/boardAsyncService', async (data) => {
    const result = await instance({
        url: `/board/FREE`,
        method: 'post',
        data: data, JSON
    })
    console.log(result)
    return result.data
})

/*
    FREE 게시판 글 상세보기
 */
export const getOneBoard  = createAsyncThunk('async/boardAsynceService', async (bno) => {
    const result = await instance({
        url:`/board/FREE/${bno}`,
        method: 'get'
    })
    return result.data
})