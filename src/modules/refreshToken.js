import instance from "./axiosConfig";

export const refreshToken = async (email,roles) => {
    const result = await instance({
        url: '/member/refresh',
        method: 'POST',
        data: {email,roles,accessToken:localStorage.getItem("accessToken"),refreshToken:localStorage.getItem("refreshToken")}
    });
    return result.data.response
}
