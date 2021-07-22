import instance from "../../modules/axiosConfig";


const fundingService = () => {
    let movePage;
    // let setAuth;

    const getFundingList = async (page) => {
        console.log("getFundingList started");
        return await instance({
            url: `funding/list?page=${page}`,
            method: 'get'
        })
    }

    const setAuthorized =  async (fno) => {
        console.log(" setAuthorized started");
        const res = await instance({
            url: `funding/req/${fno}`,
            method: 'put'
        });
        return res;
    }

    const requestFundingList = async () =>{
        console.log("requestFundingList started");

        return await instance({
            url: `funding/false/list`,
            method: 'get'
        })
    }

    const setMovePage = (func) => {
        movePage = func;
    }
    const setNextPrev = (func) => {
        movePage = func;
    }


    return {getFundingList,setMovePage,setNextPrev,setAuthorized,requestFundingList}

}
export default fundingService();