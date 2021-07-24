import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../../modules/axiosConfig";

/*
    FREE 게시판의 모든 데이터를 가져오기
 */
export const getBoardData = createAsyncThunk('async/boardAsyncService', async (request) => {
    const result = await instance({
        url: `/board/${request.boardType}/list?page=${request.page||1}&keyword=${request.keyword||""}&type=${request.type||""}`,
        method: 'get'
    });
    return result.data
})
