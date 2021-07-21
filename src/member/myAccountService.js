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
        const result = await instance({
            url: `/member/${email}`,
            method: 'GET'
        });
        return result;
    };


    return {getMyInfo}
};

export default myAccountService();
