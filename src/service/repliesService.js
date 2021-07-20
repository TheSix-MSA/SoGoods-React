import axios from "axios";

const repliesService = () => {
    const baseUrl = process.env.REACT_APP_API_DEV_URL;

    let movePage;

    let removeInput;

    const setMovePage = (func)=>{
        movePage=func;
    }

    const setRemoveInput = (func) => {
        removeInput=func;
    }

    const getRemoveInput = ()=>{
        return removeInput();
    }

    /**
     * 개시글(bno)에 달린 댓글들을 page에 맞는 개수만큼 가져오는 함수
     * 페이지 정보도 같이 가져온다
     */
    const getList = async (bno, page) => {
        const res = await axios.get(baseUrl+"reply/list/"+bno+"/"+page);
        const data = await res.data;
        return data;
    }

    const insertReply = async (reply, page) => {
        const res = await axios.post(baseUrl+"reply/", reply);
        movePage(page);
        return res;
    }

    const deleteReply = async (rno, page) => {
        const res = await axios.delete(baseUrl+"reply/"+rno);
        movePage(page);
        return res;
    }

    return {getList, insertReply, setMovePage, deleteReply,
    setRemoveInput,getRemoveInput}
}

export default repliesService();