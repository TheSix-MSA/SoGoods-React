import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../../modules/axiosConfig";

/*
    FREE 게시판의 모든 데이터를 가져오기
 */
export const getBoardData = createAsyncThunk('async/boardAsyncService', async (page) => {
    const result = await instance({
        url: `/board/FREE/list?page=${page}`,
        method: 'get'
    });
    return result.data
})
