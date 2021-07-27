import instance from "../../modules/axiosConfig";

const noticeService = () => {
    let render;

    const getNoticeList = async (page, keyword, type) => {
        const list = await instance({
            url: `/board/NOTICE/list?page=${page}&keyword=${keyword}&type=${type}`,
            method: 'get'
        });
        return list.data;
    }

    const registerBoard = async (board) => {
        const result = await instance({
            url: `/board/NOTICE`,
            method: 'post',
            data: board
        })
        return result
    }

    const changePrivate = async (bno, board) => {
        const result = await instance({
            url: `/board/NOTICE/isPrivate/${bno}`,
            method: 'put',
            data: board
        })
        render()
        return result.data
    }

    const changeRemoved = async (bno) => {
        const result = await instance({
            url: `/board/NOTICE/${bno}`,
            method: 'delete',
        })
        render()
        return result.data
    }

    const getTotal = async () => {
        const result = await instance({
            url: `/board/allcount`,
            method: 'get',
        })
        return result
    }

    const setRender = (func) => {
        render = func;
    }

    return {getTotal,getNoticeList, registerBoard, setRender, changePrivate, changeRemoved}
}
export default noticeService();