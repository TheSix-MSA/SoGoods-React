import instance from "../../modules/axiosConfig";


const adminService = () => {
    let movePage;


    const getMemberList = async (page) => {
        return await instance({
            url: "/member/list?page=" + page,
            method: 'get'
        })
    }

    const setMovePage = (func) => {
        movePage = func;
    }
    const setNextPrev = (func) => {
        movePage = func;
    }


    return {getMemberList,setMovePage,setNextPrev}

}
export default adminService();