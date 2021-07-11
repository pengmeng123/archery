import Vue from "vue";
import Vuex from "vuex";
import services from "@/services";
import _ from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startMatch: false, //是否开始动画
    count: 0, //倒计时
    animationStep: 0, //动画步骤
    times: 0, //是否播放两次
    bettingAmount: 50, //选择的投注面值
    isGameBettingTime: true, //15s前投注时间，超过就为false
    ttDirection: 3, //方向
    ttRingNumber: 6, //中了几环
    ccDirection: 1, //方向
    ccRingNumber: 8, //中了几环
    appLoading: true,
    gameInfo: {},
    mainInfo: {},
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
    SET_GAME_INFO(state, payload) {
      state.gameInfo = payload;
    },
    SET_APP_LOADING(state, payload) {
      state.appLoading = payload;
    },
    SET_MAIN_INFO(state, payload) {
      state.mainInfo = payload;
    },
  },
  actions: {
    getGameInfo({ commit }) {
      return services.user
        .getExcute()
        .then((r) => {
          if (_.get(r, "status") === 200) {
            commit("SET_GAME_INFO", _.get(r, "data.result"));
          }
        })
        .catch(() => {
          commit("SET_GAME_INFO", {});
        })
        .finally(() => {
          commit("SET_APP_LOADING", false);
        });
    },
  },
  getters: {
    count(state) {
      return state.count;
    },
    isGameBettingTime(state) {
      return state.isGameBettingTime;
    },
  },
});
