import { mapActions, mapState } from "vuex";
import AppLoading from "@/components/AppLoading";
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.getGameInfo();
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
    // eslint-disable-next-line no-constant-condition
    // if (this.appLoading) {
    //   return this.renderLoading();
    // }
    return (
      <div id="app" style="height:100%">
        <router-view />
      </div>
    );
  },
};
