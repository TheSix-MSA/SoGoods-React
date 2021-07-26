import instance from "../modules/axiosConfig";
import {getBoardData} from "../redux/board/boardAsyncService";

const boardService = () => {

    /*
        FREE 게시판 글작성
     */
    const registerBoard = async (board) => {
        const result =  await instance({
            url: `/board/${board.boardType}`,
            method: 'post',
            data: board
        })
        return result
    }

    /*
        FREE 게시판 글 상세보기
     */
    const getOneBoard = async (bno, boardType) => {
        return await instance({
            url: `/board/${boardType}/${bno}`,
            method: 'get'
        })
    }

    /*
        FREE 게시판 글 수정하기
     */
    const modifyBoard = async (bno, board, boardType) => {
        const result = await instance({
            url: `/board/${boardType}/${bno}`,
            method: 'put',
            data: board
        })
        return result
    }

    /*
        FREE 게시판 글 삭제하기
     */
    const removeBoard = async (bno, boardType) => {
        const result = await instance({
            url: `/board/${boardType}/${bno}`,
            method: 'delete'
        })
        return result
    }

    const noticeBoard = async (size) =>{
        const result =  await instance({
            url: `board/NOTICE/list?size=${size}`,
            method: 'get'
        });
        return result;
    }

    /*
        자기가 작성한 게시글 가져오기
     */
    const myBoardList = async (writer) => {
        const result = await instance ({
            url: `/board/${writer}`,
            method: 'get'
        })
        return result
    }

    return { registerBoard, getOneBoard, modifyBoard, removeBoard, noticeBoard, myBoardList }
}

export default boardService();