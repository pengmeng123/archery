import Loading from "@/components/Loading";
import { mapActions, mapState } from "vuex";
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
      return (
        <div>
          <Loading />
        </div>
      );
    },
  },
  render() {
    if (this.appLoading) {
      return this.renderLoading();
    }
    return (
      <div id="app" style="height:100%">
        <router-view />
      </div>
    );
  },
};
