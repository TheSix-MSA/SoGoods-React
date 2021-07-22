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
        ).then(value => {
            console.log(value);
        });

        return result;
    }



    return {getMyInfo, modifyInfo, searchNovelList}
};

export default myAccountService();
