import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Exchange from "../views/Exchange";
import Disconnection from "@/components/Disconnection";
import Maintenance from "@/components/Maintenance";

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
  {
    path: "/disconnection",
    name: "Disconnection",
    component: Disconnection,
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    component: Maintenance,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
