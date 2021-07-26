import instance from "../../modules/axiosConfig";
import {ToastInformation, ToastWarning} from "../../modules/toastModule";

const fundingService = () => {
    let movePage;

    const getFundingList = async (page, keyword, type) => {
        return await instance({
            url: `/funding/list?page=${page}&keyword=${keyword}&type=${type}`,
            method: 'get'
        })
    }

    // 승인 요청 리스트
    const requestFundingList = async (page) => {
        const res = await instance({
            url: `/funding/req/list?page=${page}`,
            method: 'get'
        })
        return res;
    }

    // 승인 반려 리스트
    const reject = async (fno,result,page) => {
        const res = await instance({
            url: `/funding/req/${fno}/${result}`,
            method: 'put'
        })
        movePage(page)
        return res;
    }

    const setAuthorized = async (fno, page) => {
        const res = await instance({
            url: `/funding/req/${fno}`,
            method: 'put'
        });
        movePage(page)
        return res;
    }
    const getTotal = async () => {
        const res = await instance({
            url: `/funding/total`,
            method: 'get'
        });
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

    return {getTotal,getFundingList, requestFundingList, setMovePage, changeRemoved, reject, setAuthorized}
}
export default fundingService();