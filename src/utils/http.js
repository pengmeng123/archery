import axios from "axios";
import store from "@/store";
// import router from "../router";
const BASE_URL = "/";
const TIMEOUT = 1000 * 15;

const http = axios.create({
  headers: {
    "x-requested-with": "XMLHttpRequest",
    "content-type": "application/json",
    // ...testParams,
  },
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

//(添加请求拦截器)
http.interceptors.request.use(
  (config) => {
    // config.header.token = "001";
    // config.pid = 501;
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
    if (res.status === 200) {
      store.commit("SET_NET_WORK_SUCCESS", true);
    }
    return res;
  },
  (error) => {
    const { response } = error;
    if (response) {
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      store.commit("SET_NET_WORK_SUCCESS", false);
      // router.push({ name: "Disconnection" });
    }
  }
);

export default http;
