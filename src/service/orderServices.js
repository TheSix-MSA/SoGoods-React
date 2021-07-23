import axios from "axios";
import instance from "../modules/axiosConfig";


const orderServices = () => {

    const callKakaoPay = async (params) => {
        const data = await axios.post("/v1/payment/ready", null, {
            params,
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
                "Content-type" : "application/x-www-form-urlencoded;charset=utf-8"
            }
        });
        return data;
    }

    const orderConfirmedSave = async (params) => {
        const res =  await instance({
            url: "/order/",
            method: 'post',
            data: params
        });
        return res;
    }

    return {callKakaoPay, orderConfirmedSave}
}

export default orderServices();