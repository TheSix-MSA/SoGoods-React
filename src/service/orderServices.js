import axios from "axios";
import instance from "../modules/axiosConfig";


const orderServices = () => {

    const callKakaoPay = async (inputs) => {
        console.log("params at service: ",inputs)
        const params = new URLSearchParams()
        params.append('cid', process.env.REACT_APP_KAKAO_PAY_CID)
        params.append('item_name', inputs.item_name)
        params.append('partner_order_id', inputs.partner_order_id)
        params.append('partner_user_id', inputs.partner_user_id)
        params.append('quantity', inputs.quantity)
        params.append('tax_free_amount', inputs.tax_free_amount)
        params.append('total_amount', inputs.total_amount)
        params.append('approval_url', inputs.approval_url)
        params.append('fail_url', inputs.fail_url)
        params.append('cancel_url', inputs.cancel_url)
        console.log(params)
        const data = await axios.post("/v1/payment/ready", params, {
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
                "Content-type" : "application/x-www-form-urlencoded;charset=utf-8"
            }
        });
        return data;
    }

    const kakaoPayApprovePayment = async (params) => {
        const data = await axios.post("/v1/payment/approve", params, {
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

    return {callKakaoPay, orderConfirmedSave, kakaoPayApprovePayment}
}

export default orderServices();