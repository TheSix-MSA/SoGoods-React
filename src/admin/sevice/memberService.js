import instance from "../../modules/axiosConfig";


const memberService = () => {
    let render;

    const getMemberList = async (page) => {
        console.log(" getMemberList started");
        return await instance({
            url: `member/list?page=${page}`,
            method: 'get'
        })
    }

    const getMemberApprovalList = async (page) => {
        console.log(" getMemberList started");
         const res = await instance({
            url: `member/list?approval=true&page=${page}`,
            method: 'get'
        })
        return res;
    }

    const changeRole =  async (email) => {
        console.log(" changeRole started");
        const res = await instance({
            url: `member/role/${email}`,
            method: 'post'
        })
        render()
        return res;
    }

    const changeBanned =  async (email) => {
        console.log(" changeBanned started");
        const result =await instance({
            url: `member/ban/${email}`,
            method: 'post'
        })
        render()
        return result;
    }

    const setRender = (func) => {
        render = func;
    }

    return {setRender,getMemberList,changeRole,changeBanned, getMemberApprovalList}

}
export default memberService();