import instance from "../modules/axiosConfig";

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


    return {getMyInfo, modifyInfo}
};

export default myAccountService();
