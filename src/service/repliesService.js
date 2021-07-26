import instance from "../modules/axiosConfig";

const repliesService = () => {
    let movePage;

    let removeInput;

    let removeModifyInput;

    const setMovePage = (func)=>{
        movePage=func;
    }

    const setRemoveInput = (func) => {
        removeInput=func;
    }

    const getRemoveInput = ()=>{
        return removeInput();
    }

    const setRemoveModifyInput = (func) => {
        removeModifyInput=func;
    }

    const getRemoveModifyInput = ()=>{
        return removeModifyInput();
    }

    /**
     * 개시글(bno)에 달린 댓글들을 page에 맞는 개수만큼 가져오는 함수
     * 페이지 정보도 같이 가져온다
     */
    const getList = async (bno, page) => {
        return await instance({
            url: "/reply/list/"+bno+"/"+page,
            method: 'get'
        })
    }

    const insertReply = async (reply, page) => {
        const res =  await instance({
            url: "/reply/",
            method: 'post',
            data: reply
        });

        // const increaseReplyNum = await instance({
        //     url: "/board/countUp/"+bno
        //     method: "put"
        // })
        movePage(page);
        return res;
    }

    const deleteReply = async (rno, page) => {
        const res = await instance({
            url: "/reply/"+rno,
            method: 'delete'
        });
        movePage(page);
        return res;
    }

    const updateReply = async (reply, page) => {
        const res =  await instance({
            url: "/reply/",
            method: 'put',
            data: reply
        });
        movePage(page);
        return res;
    }

    return {getList, insertReply, updateReply, deleteReply,
    setRemoveInput,getRemoveInput, setMovePage,
    getRemoveModifyInput, setRemoveModifyInput}
}

export default repliesService();