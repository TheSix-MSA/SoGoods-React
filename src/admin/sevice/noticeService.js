import instance from "../../modules/axiosConfig";

const noticeService = () => {

    const getNoticeList = async (page) =>{
        console.log(" getNoticeList started");
        const list =  await instance({
            // url: `board/notice/list?page=${page}&keyword=${keyword}&type=${type}`,
            url: `board/NOTICE/list?page=${page}`,
            method: 'get'
        });
        return list.data;
    }

    return{getNoticeList}
}
export default noticeService();