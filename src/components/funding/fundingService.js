import axios from "axios";
import instance from "../../modules/axiosConfig";

const headerObj = {
    headers: {
        'Content-Type' : 'application/json'
    }
}

const fundingService = () => {

    // 펀딩 리스트 얻어오기
    const getList = async (page) => {
        console.log(page)
        const list = await instance({
            url: `/funding/list?page=${page}`,
            method: 'get'
        });
       return list.data
    }

    // 펀딩 등록처리 하기
    const registerFunding = async (form) => {
        console.log(form)
        const jsonData = JSON.stringify(form);
        const result = await instance({
            url : `/funding`,
            method: 'post',
            data : jsonData
        });
        return result.data
    }

    // 펀딩 게시글 한개만 가져오기
    const getOneFunding = async (fno) => {
        const result = await instance({
            url:`/funding/read/`+ fno,
            method:'get'
        })
        return result.data
    }



    return {getList, registerFunding, getOneFunding}
}

export default fundingService()