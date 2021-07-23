import instance from "../../modules/axiosConfig";


const fundingService = () => {
    let movePage;
    let render;

    // 펀딩 전체 리스트
    const getFundingList = async (page,keyword,type) => {
        return await instance({
            url: `funding/list?page=${page}&keyword=${keyword}&type=${type}`,
            method: 'get'
        })
    }

    // 승인 요청온 펀딩 리스트
    const requestFundingList = async (page) => {
        const res = await instance({
            url: `funding/false/list?page=${page}`,
            method: 'get'
        })
        return res;
    }

    const setAuthorized = async (fno, page) => {
        const res = await instance({
            url: `funding/req/${fno}`,
            method: 'put'
        });
        movePage(page)
        return res;
    }

    const setRender = (func) => {
        render = func;
    }

    const setMovePage = (func) => {
        movePage = func;
    }


    return {getFundingList, setRender, setAuthorized, requestFundingList, setMovePage}

}
export default fundingService();