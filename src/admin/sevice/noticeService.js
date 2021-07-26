import instance from "../../modules/axiosConfig";

const noticeService = () => {
    let render;

    const getNoticeList = async (page, keyword, type) => {
        console.log(" getNoticeList started");
        const list = await instance({
            url: `board/NOTICE/list?page=${page}&keyword=${keyword}&type=${type}`,
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
        console.log("sadfsdfdsafasdfassdfdsfsa")
        const result = await instance({
            url: `/board/NOTICE/${bno}`,
            method: 'delete',
        })
        render()
        return result.data
    }

    const setRender = (func) => {
        render = func;
    }

    return {getNoticeList, registerBoard, setRender, changePrivate, changeRemoved}
}
export default noticeService();