import instance from "../../modules/axiosConfig";
import {ToastInformation, ToastWarning} from "../../modules/toastModule";

const fundingService = () => {
    let movePage;

    const getFundingList = async (page, keyword, type) => {
        return await instance({
            url: `funding/list?page=${page}&keyword=${keyword}&type=${type}`,
            method: 'get'
        })
    }

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

    const changeRemoved = async (fno, page) => {
        console.log("changeRemoved started")
        const result = await instance({
            url: `/funding/${fno}`,
            method: 'delete',
        })
        ToastInformation("해당 펀딩이 삭제되었습니다.")
        movePage(page)
        return result.data
    }

    const setMovePage = (func) => {
        movePage = func;
    }

    return {getFundingList, setAuthorized, requestFundingList, setMovePage, changeRemoved}
}
export default fundingService();