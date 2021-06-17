import axios from "axios";
const BASE_URL = "/";
const TIMEOUT = 1000 * 15;
const http = axios.create({
  headers: {
    "x-requested-with": "XMLHttpRequest",
    "content-type": "application/json",
  },
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

//(添加请求拦截器)
http.interceptors.request.use(
  (config) => {
    // config.header.token = "001";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//返回状态判断(添加响应拦截器)
http.interceptors.response.use(
  (res) => {
    // if (res.data.code == 1) {
    //   return Promise.resolve(res);
    // } else {
    //   alert(res.msg); //提示后台返回的错误值
    // }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
