import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Bootstrap from "./plugins/Bootstrap";
import "./styles/app.less";

Vue.config.productionTip = false;
Vue.use(Bootstrap);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
