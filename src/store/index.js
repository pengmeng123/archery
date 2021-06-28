import Vue from "vue";
import Vuex from "vuex";
import { COUNT } from "@/config/common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startMatch: true,
    count: COUNT,
  },
  mutations: {
    SET_START_MATCH_STATUS(state, status) {
      state.startMatch = status;
    },
    SET_COUNT(state, count) {
      state.count = count;
    },
  },
  actions: {},
  getters: {
    count(state) {
      return state.count;
    },
  },
});
