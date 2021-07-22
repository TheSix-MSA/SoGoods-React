import axios from "axios";
/**
 * const result = async (data) => {
 *  return await instance({
 *   url: '/', endpoint
 *   method: 'get/post/delete/put',
 *   data: data, JSON
 *  });
 * };
 * @type {AxiosInstance}
 */
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_DEV_URL}`,
    timeout: 10000,
    params: {}, // do not remove this, its added to add params later in the config
    // withCredentials: true,
});

export default instance;