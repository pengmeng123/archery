import Vue from "vue";
import Vuex from "vuex";
import { COUNT } from "@/config/common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startMatch: false, //是否开始动画
    count: COUNT, //倒计时
    animationStep: 0, //动画步骤
    bettingAmount: 50, //选择的投注面值
  },
  mutations: {
    SET_START_MATCH_STATUS(state, status) {
      state.startMatch = status;
    },
    SET_COUNT(state, count) {
      state.count = count;
    },
    SET_ANIMATION_STEP(state, step) {
      state.animationStep = step;
    },
    SET_BETTING_AMOUNT(state, count) {
      state.bettingAmount = count;
    },
  },
  actions: {},
  getters: {
    count(state) {
      return state.count;
    },
  },
});
