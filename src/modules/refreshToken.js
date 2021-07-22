import instance from "./axiosConfig";

export const refreshToken = async () => {
    const result = await instance({
        url: '/member/refresh',
        method: 'POST',
        data: JSON.parse(localStorage.getItem("userData")),
    });
    return result.data.response
}
