import axios from "axios";
import instance from "../../modules/axiosConfig";

const fundingService = () => {

    // 펀딩 리스트 얻어오기
    const getList = async (page, keyword="", type="") => {
        const list = await instance({
            url: `/funding/list?page=${page}&keyword=${keyword}&type=${type}`,
            method: 'get'
        });
       return list.data;
    }

    // 펀딩 등록처리 하기
    const registerFunding = async (form) => {
        const result = await instance({
            url : `/funding/`,
            method: 'post',
            data : form
        });
        return result.data;
    }

    // 펀딩 게시글 한개만 가져오기
    const getOneFunding = async (fno) => {
        const result = await instance({
            url:`/funding/`+ fno +`/`,
            method:'get'
        })
        return result.data;
    }

    // 펀딩 게시글 찜하기
    const insertFavorite = async (favorite) => {
        console.log(favorite)
        const result = await instance({
            url:`/funding/fav/`,
            method : 'post',
            data:favorite
        })
        return result.data;
    }

    // 내가 쓴 펀딩 게시글 가져오기
    const getMyFundingList = async (email) => {
        const result = await instance({
            url:`/funding/user/list/`+ email+`/`,
            method:'get'
        })
        console.log(result.data)
        return result.data;
    }

    // 내가 찜한 펀딩 게시글 가져오기
    const getMyFavFundingList = async (email) => {
        const result = await instance({
            url:`/funding/fav/list/`+ email+`/`,
            method:'get'
        })
        console.log(result.data)
        return result.data;
    }

    // 게시글 수정하기
    const updateFunding = async(fno, form) => {
        console.log(form)
        const result = await instance({
            url:`/funding/`+fno+`/`,
            method:'put',
            data:form
        })
        return result.data;
    }

    const removedFunding = async(fno) => {
        const result = await instance({
            url:`/funding/`+fno+`/`,
            method: 'delete'
        })
        return result.data;
    }





    return {getList, registerFunding, getOneFunding, insertFavorite, getMyFundingList, getMyFavFundingList, updateFunding, removedFunding}
}

export default fundingService()