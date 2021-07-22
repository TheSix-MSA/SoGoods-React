import instance from "../modules/axiosConfig";
import {getBoardData} from "../redux/board/boardAsyncService";

const boardService = () => {

    /*
        FREE 게시판 글작성
     */
    const registerBoard = async (board) => {
        const result =  await instance({
            url: `/board/FREE`,
            method: 'post',
            data: board
        })
        return result
    }

    /*
        FREE 게시판 글 상세보기
     */
    const getOneBoard = async (bno) => {
        return await instance({
            url: `/board/FREE/${bno}`,
            method: 'get'
        })
    }

    /*
        FREE 게시판 글 수정하기
     */
    const modifyBoard = async (bno, board) => {
        const result = await instance({
            url: `/board/FREE/${bno}`,
            method: 'put',
            data: board
        })
        return result
    }

    /*
        FREE 게시판 글 삭제하기
     */
    const removeBoard = async (bno) => {
        const result = await instance({
            url: `/board/FREE/${bno}`,
            method: 'delete'
        })
        return result
    }

    /*
        FREE 게시판 글 검색하기
     */
    const searchBoard = async (value) => {
        console.log(3333, value)
        const result = await instance({
            url: `/board/FREE/list?page=${value.page}&keyword=${value.keyword}&type=${value.type}`,
            method: 'get'
        })
        console.log(4444, result)
        return { result }
    }

    return { registerBoard, getOneBoard, modifyBoard, removeBoard, searchBoard }
}

export default boardService();