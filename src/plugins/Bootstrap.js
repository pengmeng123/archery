import service from "@/services";

const install = (Vue) => {
  Vue.prototype.$service = service;
};
export default {
  install,
};
