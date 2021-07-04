import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Exchange from "../views/Exchange";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/exchange",
    name: "Exchange",
    component: Exchange,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
