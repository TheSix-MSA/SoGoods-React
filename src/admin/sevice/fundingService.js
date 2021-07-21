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

    const setAuthorized =  async (fno,page) => {
        console.log(" setAuthorized started");
        const res = await instance({
            url: `funding/req/${fno}`,
            method: 'put'
        });
        console.log(res)
        movePage(page)
        return res;
    }
    // const setAuthorizedService =(func) =>{
    //     setAuth = func
    // }

    const setMovePage = (func) => {
        movePage = func;
    }
    const setNextPrev = (func) => {
        movePage = func;
    }


    return {getFundingList,setMovePage,setNextPrev,setAuthorized}

}
export default fundingService();