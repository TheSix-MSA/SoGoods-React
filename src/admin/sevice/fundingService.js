import instance from "../../modules/axiosConfig";


const fundingService = () => {
    // let movePage;
    let render;

    const getFundingList = async (page) => {
        console.log("getFundingList started");
        return await instance({
            url: `funding/list?page=${page}`,
            method: 'get'
        })
    }

    const setAuthorized = async (fno) => {
        console.log(" setAuthorized started");
        const res = await instance({
            url: `funding/req/${fno}`,
            method: 'put'
        });
        render()
        return res;
    }

    const requestFundingList = async (email, page) => {
        console.log("requestFundingList started");
        const res = await instance({
            url: `funding/false/list`,
            method: 'get'
        })
        return res;
    }

    const setRender = (func) => {
        render = func;
    }

    // const setMovePage = (func) => {
    //     movePage = func;
    // }


    return {getFundingList, setRender, setAuthorized, requestFundingList}

}
export default fundingService();