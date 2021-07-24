import axios from "axios";
import instance from "../modules/axiosConfig";


const orderServices = () => {

    const callKakaoPay = async (inputs) => {
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

    const cancelKakaoPay = async (inputs) => {
        console.log(inputs)
        const params = new URLSearchParams()
        params.append('cid', process.env.REACT_APP_KAKAO_PAY_CID)
        params.append('tid', inputs.tid)
        params.append('cancel_tax_free_amount', inputs.cancel_tax_free_amount)
        params.append('cancel_amount', inputs.cancel_amount)
        const data = await axios.post("/v1/payment/cancel", params, {
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
                "Content-type" : "application/x-www-form-urlencoded;charset=utf-8"
            }
        });
        return data;
    }

    const orderConfirmedSave = async (params) => {
        const res =  await instance({
            url: "/funding/order/",
            method: 'post',
            data: params
        });
        return res;
    }

    const ordersUserMade = async (info) => {
        const res = await instance({
            url: `/funding/order/list?email=${info.email}&page=${info.page}`,
            method: "get"
        });
        return res;
    }

    const cancelOrdersUserMade = async (ono) => {
        console.log(ono)
        const res = await instance({
            url: "/funding/order/cancel/"+ono,
            method: "put"
        });
        return res;
    }

    return {callKakaoPay, orderConfirmedSave, kakaoPayApprovePayment, ordersUserMade, cancelKakaoPay, cancelOrdersUserMade}
}

export default orderServices();