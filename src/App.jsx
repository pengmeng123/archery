import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState(["appLoading"]),
  },
  methods: {
    ...mapActions({
      getGameInfo: "getGameInfo",
    }),
    renderLoading() {
      return <AppLoading />;
    },
  },
  render() {
    return (
      <div id="app" style="height:100%">
        <router-view />
      </div>
    );
  },
};
