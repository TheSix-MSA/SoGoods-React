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
    return result.data
})

/*
    FREE 게시판 글작성
 */
export const registerBoard = createAsyncThunk('async/boardAsyncService', async (board) => {
    const result = await instance({
        url: `/board/FREE`,
        method: 'post',
        data: board
    })
    return result
})

/*
    FREE 게시판 글 상세보기
 */
export const getOneBoard  = createAsyncThunk('async/boardAsynceService', async (bno) => {
    const result = await instance({
        url: `/board/FREE/${bno}`,
        method: 'get'
    })
    return result.data
})

/*
    FREE 게시판 글 수정하기(미완)
 */
export const modifyBoard = createAsyncThunk('async/boardAsyncService', async (bno,board) => {
    console.log(bno, board)
    const result = await instance({
        url:`/board/FREE/${bno}`,
        method:'put'
    })
    return result
})

/*
    FREE 게시판 글 삭제하기(미완)
 */
export const removeBoard = createAsyncThunk('async.boardAsyncService', async(bno) =>{

    const result = await instance({
        url:`/board/FREE/${bno}`,
        method:'delete'
    })
    return result
})