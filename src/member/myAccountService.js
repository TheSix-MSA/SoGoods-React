import instance from "../modules/axiosConfig";
import axios from "axios";

const myAccountService = () => {
    let loginInfo={
        email:"",
        password: "",
        name: "",
        gender: "",
        birth: "",
        phone: "",
        address: "",
    };

    let dialogFn;
    let closeDialogFn;
    let clearInputFn;
    let listFlagFn;

    const setListFlag = (func) => {
        listFlagFn = func
    };

    const changeFlag = () => {
        listFlagFn();
    };

    const setClearInputFn = (func) =>{
        clearInputFn = func;
    }

    const clearInput = ()=>{
        clearInputFn();
    }

    const setDialogFn = (func) => {
        dialogFn = func;
    };

    const setCloseDialogFn = (func) =>{
        closeDialogFn = func;
    }

    const popUpDialogFn = () => {
        dialogFn();
    };

    /**
     * 로그인한 유저의 정보를 가져온다.
     *
     * @param email
     * @returns {Promise<*>}
     */
    const getMyInfo = async (email) => {
        if(email==="") email = -1;
        const result = await instance({
            url: `/member/${email}`,
            method: 'GET'
        });
        return result;
    };

    /**
     * member의 정보를 수정요청.
     *
     * @param editInfo
     * @returns {Promise<*>}
     */
    const modifyInfo = async (editInfo) => {
        const result = await instance({
            url: `/member/`,
            method: 'PUT',
            data: editInfo
        });
        return result;
    };

    /**
     * 알라딘 API를 이용해서 ISBN에 해당하는 작품을 가져온다.
     *
     * @param isbnKey
     * @returns {Promise<any>}
     */
    const searchNovelList = async (isbnKey)=> {

        const result = await axios.get(
            `/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.REACT_APP_ALADIN_TTB_KEY}&ItemId=${isbnKey}&itemIdType=ISBN13&output=js&Version=20131101`
        )
        return result.data;
    }


    /**
     * 작품 등록하기.
     *
     * @param novels
     * @returns {Promise<*>}
     */
    const registerNovel = async (novels) => {

        const result = await instance({
            url: '/member/novels',
            method: 'POST',
            data: novels
        });

        return result.data;
    };

    /**
     * 사용자의 작품리스트 불러오기.
     *
     * @param pageInfo
     * @returns {Promise<*>}
     */
    const getNovelList = async (pageInfo)=>{
        const result = await instance({
            url: `/member/novels?email=${pageInfo.email}&page=${pageInfo.page}`,
            method: 'GET'
        });

        return result;
    }

    /**
     * 소설의 삭제.
     *
     * @param novel
     * @returns {Promise<*>}
     */
    const removeNovel = async (novel) => {
        const result = await instance({
            url: '/member/novels',
            method: 'DELETE',
            data: novel
        });

        return result;
    };


    return {getMyInfo, modifyInfo, searchNovelList, popUpDialogFn, setDialogFn, setCloseDialogFn, registerNovel,clearInput,
        setClearInputFn, getNovelList, setListFlag, changeFlag, removeNovel}
};

export default myAccountService();
