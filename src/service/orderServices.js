import axios from "axios";


const orderServices = () => {
    let openKakaoDigalog;
    let closeKakaoDialog;

    const setOpenKakaoDigalog = (func) => {
        openKakaoDigalog = func;
    }
    const setCloseKakaoDialog = (func) => {
        closeKakaoDialog = func;
    }

    const openKakaoPay = () => {
        openKakaoDigalog();
    }

    const closeKakaoPay = () => {
        closeKakaoDialog();
    }

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

    return {setCloseKakaoDialog, setOpenKakaoDigalog, callKakaoPay}
}

export default orderServices();