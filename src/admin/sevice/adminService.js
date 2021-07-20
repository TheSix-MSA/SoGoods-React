import instance from "../../modules/axiosConfig";


const adminService = () => {
    let movePage;


    const getMemberList = async (page) => {
        return await instance({
            url: "/member/list" + "/" + page,
            method: 'get'
        })
    }

    const setMovePage = (func) => {
        movePage = func;
    }


    return {getMemberList,setMovePage}

}
export default adminService();