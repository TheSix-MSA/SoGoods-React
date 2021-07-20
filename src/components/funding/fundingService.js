import axios from "axios";

const baseURL = "http://localhost:8090/funding"
const headerObj = {
    headers: {
        'Content-Type' : 'application/json'
    }
}

const fundingService = () => {

    const getList = async (page) => {
        console.log(page)
        const list = await axios.get(baseURL+"/list?page="+page)
        const data = await list.data
        console.log(data)
        return data
    }

    return {getList:getList}
}

export default fundingService()