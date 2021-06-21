import styles from "./index.module.less";
import AppMenu from "@/components/AppMenu";
import AppHeader from "@/components/AppHeader";
import AppStake from "@/components/AppStake";
import AppChild from "@/components/AppChild";
import AppGamePlayer from "@/components/AppGamePlayer";
import AppFooter from "@/components/AppFooter";
import BetsMixin from "@/mixins/betsMixin";
export default {
  name: "Home",

  components: {
    AppMenu,
    AppHeader,
    AppStake,
    AppChild,
    AppGamePlayer,
    AppFooter,
  },
  mixins: [BetsMixin],
  data() {
    return {
      isScale: false,
    };
  },
  mounted() {},
  render() {
    return (
      <div
        class={{
          [styles.container]: true,
          [styles.scaleTransition]: this.isScale,
        }}
      >
        <div>
          <app-menu />
          <app-header />
          <app-stake />
          <app-child />
        </div>
        <div>
          <app-game-player />
          <app-footer />
        </div>
      </div>
    );
  },
};
