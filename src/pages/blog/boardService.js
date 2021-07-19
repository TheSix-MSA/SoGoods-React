import axios from "axios";
const baseUrl = process.env.REACT_APP_API_DEV_URL

const boardService = () => {
    const getBoardList = async () => {
        const result = await axios.get(baseUrl+"/board/FREE/list")
        const data = await result.data
        return data
    }

    return {getBoardList}
}


export default boardService();