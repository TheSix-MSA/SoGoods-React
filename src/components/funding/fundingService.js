import axios from "axios";
import instance from "../../modules/axiosConfig";

const headerObj = {
    headers: {
        'Content-Type' : 'application/json'
    }
}

const fundingService = () => {

    const getList = async (page) => {
        console.log(page)
        const list = await instance({
            url: `/funding/list?page=${page}`,
            method: 'get'
        });
       return list.data
    }

    // const registerFunding = async (form) => {
    //     const jsonData = JSON.stringify(form);
    //     const result = await axios.post(baseURL, jsonData, headerObj);
    //     const data = await result.data;
    //     console.log(data);
    //     return data;
    // }

    const registerFunding = async (form) => {
        const result = await instance({
            url : `/funding/`,
            method: 'post',
            data : JSON
        });
        return result.data
    }



    return {getList, registerFunding}
}

export default fundingService()