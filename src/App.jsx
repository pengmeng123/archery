import { mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getGameInfo: "getGameInfo",
    }),
  },
  render() {
    return (
      <div id="app" style="height:100%">
        <router-view />
      </div>
    );
  },
};
