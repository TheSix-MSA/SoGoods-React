import instance from "../../modules/axiosConfig";

const memberService = () => {
    let render;
    let movePage;

    const getMemberList = async (page, keyword, type) => {
        console.log(" getMemberList started", type);
        return await instance({
            url: `member/list?page=${page}&keyword=${keyword}&type=${type}`,
            method: 'get'
        })
    }

    const getMemberApprovalList = async (page) => {
        const res = await instance({
            url: `member/list?approval=true&page=${page}`,
            method: 'get'
        })
        return res;
    }

    // 전체 렌더링 (MemberTableApproval)
    const changeRole = async (email, page) => {
        const res = await instance({
            url: `member/role/${email}`,
            method: 'post'
        })
        movePage(page)
        return res;
    }

    // 리스트만 렌더링 (MemberTable)
    const changeAuth = async (email) => {
        const res = await instance({
            url: `member/role/${email}`,
            method: 'post'
        })
        render()
        return res;
    }

    const changeBanned = async (email) => {
        const result = await instance({
            url: `member/ban/${email}`,
            method: 'post'
        })
        render()
        return result;
    }

    const setRender = (func) => {
        render = func;
    }
    const setMovePage = (func) => {
        movePage = func;
    }

    return {setRender, getMemberList, changeRole, changeBanned, getMemberApprovalList, setMovePage, changeAuth}
}
export default memberService();