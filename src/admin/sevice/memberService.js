import instance from "../../modules/axiosConfig";


const memberService = () => {
    let movePage;
    let setRole;
    let setBanned =false;

    const getMemberList = async (page) => {
        console.log(" getMemberList started");
        return await instance({
            url: `member/list?page=${page}`,
            method: 'get'
        })
    }

    const changeRole =  async (email) => {
        console.log(" changeRole started");
        const res = await instance({
            url: `member/role/${email}`,
            method: 'post'
        });
        console.log(res)
        setRole(res.data.response.roleSet[res.data.response.roleSet.length-1])
        console.log(res.data.response.roleSet[res.data.response.roleSet.length-1])
        return res;
    }

    const setRoleService =(func)=>{
        setRole = func
    }

    const changeBanned =  async (email) => {
        console.log(" changeBanned started");
        const res = await instance({
            url: `member/ban/${email}`,
            method: 'post'
        })
        // console.log("changeBanneds content",res.data.response.banned)
        setBanned(res.data.response.banned)
        return res;
    }

    const setBannedService =(func)=>{
        setBanned = func
    }


    const setMovePage = (func) => {
        movePage = func;
    }

    const setNextPrev = (func) => {
        movePage = func;
    }


    return {getMemberList,setMovePage,setNextPrev,changeRole,setRoleService,changeBanned, setBannedService}

}
export default memberService();