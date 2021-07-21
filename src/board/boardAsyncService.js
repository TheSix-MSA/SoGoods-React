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
