import Vue from "vue";
import Vuex from "vuex";
import { COUNT } from "@/config/common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startMatch: true,
    count: COUNT,
    startAnimation: false,
    startBgAnimation: false,
    animationStep: 0,
  },
  mutations: {
    SET_START_MATCH_STATUS(state, status) {
      state.startMatch = status;
    },
    SET_COUNT(state, count) {
      state.count = count;
    },
    SET_STRRT_ANIMATION(state, status) {
      state.startAnimation = status;
    },
    SET_STRRT_BG_ANIMATION(state, status) {
      state.startBgAnimation = status;
    },
    SET_ANIMATION_STEP(state, step) {
      state.animationStep = step;
    },
  },
  actions: {},
  getters: {
    count(state) {
      return state.count;
    },
  },
});
