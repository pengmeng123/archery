import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Bootstrap from "./plugins/Bootstrap";
import animated from "animate.css";

import VConsole from "@/utils/v-console";
import "./styles/app.less";
import Toast from "./plugins/toast";

Vue.config.productionTip = false;
Vue.use(Bootstrap);
Vue.use(animated);
Vue.use(Toast);
const isDev = process.env.NODE_ENV === "development";
isDev && Vue.use(VConsole);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
