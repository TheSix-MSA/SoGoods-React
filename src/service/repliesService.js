import axios from "axios";


const repliesService = () => {
    const baseUrl = process.env.REACT_APP_API_DEV_URL
    console.log(baseUrl);
    /**
     * 개시글(bno)에 달린 댓글들을 page에 맞는 개수만큼 가져오는 함수
     * 페이지 정보도 같이 가져온다
     */
    const getList = async (bno, page) => {
        console.log("getList activated");
        const res = await axios.get(baseUrl+"reply/list/"+bno+"/"+page);
        const data = await res.data;
        return data;
    }

    return {getList}
}

export default repliesService();