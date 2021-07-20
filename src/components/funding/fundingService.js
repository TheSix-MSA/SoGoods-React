import axios from "axios";
import process from "process";
import instance from "../../modules/axiosConfig";

const baseURL = 'http://localhost:8090/funding';

const headerObj = {
    headers: {
        'Content-Type' : 'application/json'
    }
}

const fundingService = () => {

    const getList = async (page) => {
        console.log(page)
        const list = await axios.get(baseURL+"/list?page="+page);
        const data = await list.data;
        console.log(data);

         // const getList = async (data) => {
         //  return await instance({
         //          url: `${process.env.REACT_APP_API_DEV_URL}`,
         //          method: 'get',
         //          data: data, JSON
         //      });
         //  };
       return data
    }

    const registerFunding = async () => {
        const result = await axios.post(baseURL+"/");
        const data = await result.data;
        return data;
    }




    return {getList, registerFunding}
}

export default fundingService()