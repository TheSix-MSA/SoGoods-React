import axios from "axios";
import instance from "../../modules/axiosConfig";

const fundingService = () => {

    // 펀딩 리스트 얻어오기
    const getList = async (page, keyword="", type="", state) => {
        const list = await instance({
            url: `/funding/list?page=${page}&keyword=${keyword}&type=${type}&state=${state}`,
            method: 'get'
        });
        console.log(list.data);
       return list.data;
    }

    // 펀딩 등록처리 하기
    const registerFunding = async (form) => {
        const result = await instance({
            url : `/funding/`,
            method: 'post',
            data : form
        });
        return result;
    }

    //사진 업로드하기 - 개발중
    const registerAttach = async(files, tableName, keyValue, mainIdx) => {
        const form = new FormData();
        files.forEach(ele=>{
            form.append('files', ele)
        })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${(JSON.parse(localStorage.getItem("userData")))?.accessToken || ""}`,
            },
        }

        const result = await axios.post(`${process.env.REACT_APP_API_URL}/attach/upload?tableName=${tableName}&keyValue=${keyValue}&mainIdx=${mainIdx}`,
            form, config)
    }

    //펀딩 글 등록시 관련된 상품들 등록처리하기
    const registerProduct = async (fno, productList) => {
        const result = await instance({
            url : `/`,
            method: 'post',
            data : {fno, productList}
        });
        return result.data;
    }

    // 펀딩 게시글 한개만 가져오기
    const getOneFunding = async (fno) => {
        const result = await instance({
            url:`/funding/${fno}/`,
            method:'get'
        })
        return result.data;
    }

    // 게시글의 찜 리스트 가져오기
    const getFavList = async (fno) => {
        const result = await instance({
            url:`/funding/fav/${fno}`,
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
            url:`/funding/user/list/${email}/`,
            method:'get'
        })
        console.log(result.data)
        return result.data;
    }

    // 내가 찜한 펀딩 게시글 가져오기
    const getMyFavFundingList = async (email) => {
        const result = await instance({
            url:`/funding/fav/list/${email}/`,
            method:'get'
        })
        console.log(result.data)
        return result.data;
    }

    // 게시글 수정하기
    const updateFunding = async(fno, form) => {
        console.log(form)
        const result = await instance({
            url:`/funding/${fno}/`,
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




    return {
        getList,
        registerFunding,
        getOneFunding,
        insertFavorite,
        getMyFundingList,
        getMyFavFundingList,
        updateFunding,
        removedFunding,
        registerAttach,
        getFavList
    }
}

export default fundingService()