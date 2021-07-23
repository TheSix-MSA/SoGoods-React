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
        console.log(123, clearInputFn);
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

    const getMyInfo = async (email) => {
        if(email==="") email = -1;
        const result = await instance({
            url: `/member/${email}`,
            method: 'GET'
        });
        return result;
    };

    const modifyInfo = async (editInfo) => {
        const result = await instance({
            url: `/member/`,
            method: 'PUT',
            data: editInfo
        });
        return result;
    };

    const searchNovelList = async (isbnKey)=> {
        console.log(isbnKey);
        console.log(`${process.env.REACT_APP_ALADIN_TTB_KEY}`)

        const result = await axios.get(
            `/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.REACT_APP_ALADIN_TTB_KEY}&ItemId=${isbnKey}&itemIdType=ISBN13&output=js&Version=20131101`
        )

        return result.data;
    }


    const registerNovel = async (novels) => {

        const result = await instance({
            url: '/member/novels',
            method: 'POST',
            data: novels
        });

        return result.data;
    };
    
    const getNovelList = async (pageInfo)=>{
        const result = await instance({
            url: `/member/novels?email=${pageInfo.email}&page=${pageInfo.page}`,
            method: 'GET'
        });
        console.log("서비스에서 찍히는 리스트",result);

        return result;
    }


    return {getMyInfo, modifyInfo, searchNovelList, popUpDialogFn, setDialogFn, setCloseDialogFn, registerNovel,clearInput,
        setClearInputFn, getNovelList, setListFlag, changeFlag}
};

export default myAccountService();
