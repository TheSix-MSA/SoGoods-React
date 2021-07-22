import instance from "../../modules/axiosConfig";
import {func} from "prop-types";


const memberService = () => {
    let render;
    let movePage;
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

    //list 전체 렌더링용
    const changeRole =  async (email,page) => {
        console.log(" changeRole started");
        const res = await instance({
            url: `member/role/${email}`,
            method: 'post'
        })
        // render()
        movePage(page)
        return res;
    }
    //
    // const changeRole =  async (email,page) => {
    //     console.log(" changeRole started");
    //     const res = await instance({
    //         url: `member/role/${email}`,
    //         method: 'post'
    //     })
    //     // render()
    //     movePage(page)
    //     return res;
    // }

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
    const setMovePage = (func)=>{
        movePage = func;
    };


    return {setRender,getMemberList,changeRole,changeBanned, getMemberApprovalList, setMovePage}

}
export default memberService();