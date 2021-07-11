import Vue from "vue";
import Vuex from "vuex";
import { COUNT } from "@/config/common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startMatch: false, //是否开始动画
    count: COUNT, //倒计时
    animationStep: 0, //动画步骤
    times: 0, //是否播放两次
    bettingAmount: 50, //选择的投注面值
    isGameBettingTime: true, //15s前投注时间，超过就为false
    ttDirection: 3, //方向
    ttRingNumber: 6, //中了几环
    ccDirection: 1, //方向
    ccRingNumber: 8, //中了几环
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
    SET_TIMES(state, times) {
      state.times = times;
    },
    SET_GAME_BETTING_STATUS(state, status) {
      state.isGameBettingTime = status;
    },
  },
  actions: {},
  getters: {
    count(state) {
      return state.count;
    },
    isGameBettingTime(state) {
      return state.isGameBettingTime;
    },
  },
});
