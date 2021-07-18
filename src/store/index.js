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
    appLoading: true, //带有进度条loading
    gameInfo: {}, //主流程接口信息
    mainInfo: {}, //menu接口信息
    networkSuccess: true, //断网的情况，默认是true
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
    SET_NET_WORK_SUCCESS(state, payload) {
      state.networkSuccess = payload;
    },
  },
  actions: {
    getGameInfo({ commit }) {
      return services.user
        .getExcute()
        .then((r) => {
          if (_.get(r, "data.code") === 1000) {
            commit("SET_GAME_INFO", _.get(r, "data.result"));
            return r;
          } else {
            commit("SET_GAME_INFO", {});
            return Promise.reject();
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
    gameResult(state) {
      //tt和cc分别中靶的环数
      const gameResultBettingRings = !_.isEmpty(state.gameInfo)
        ? _.keyBy(_.get(state.gameInfo, "currentGame.result"), "result")
        : null;
      // 中了几环 0平局，1-tt，2-cc
      const result = _.get(state.gameInfo, "currentGame.gameResult");
      return !_.isNil(result)
        ? {
            result: result,
            ttRingNumber:
              _.get(gameResultBettingRings, "[1].numberOfRings") || 1,
            ttDirection: _.get(gameResultBettingRings, "[1].direction") || 1,
            ccRingNumber:
              _.get(gameResultBettingRings, "[2].numberOfRings") || 1,
            ccDirection: _.get(gameResultBettingRings, "[2].direction") || 1,
            mybet: _.get(state.gameInfo, "mybet") || [], //自己账号的中奖情况[{result:1,account:0},{result:2,account:-50},{result:3,account:100}]
          }
        : {};
    },
  },
});
