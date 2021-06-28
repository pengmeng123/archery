import styles from "./index.module.less";
import AppMenu from "@/components/AppMenu";
import AppHeader from "@/components/AppHeader";
import AppStake from "@/components/AppStake";
import AppChild from "@/components/AppChild";
import AppGamePlayer from "@/components/AppGamePlayer";
import AppFooter from "@/components/AppFooter";
import BetsMixin from "@/mixins/betsMixin";
import Archery from "@/components/Archery";

export default {
  name: "Home",

  components: {
    AppMenu,
    AppHeader,
    AppStake,
    AppChild,
    AppGamePlayer,
    AppFooter,
    Archery,
  },
  mixins: [BetsMixin],
  data() {
    return {
      isScale: false,
    };
  },
  mounted() {},

  methods: {},
  render() {
    return (
      <div
        class={{
          [styles.container]: true,
          [styles.scaleTransition]: this.isScale,
        }}
      >
        <div class={styles.topPart}>
          <div
            class={{
              "animate__animated animate__fadeOut": this.startMatch,
              "animate__animated animate__fadeIn": !this.startMatch,
            }}
            style="position:relative;z-index:2"
          >
            <app-menu />
            <app-header />
          </div>
          <app-stake />
          <app-child />
        </div>
        <div
          class={{
            "animate__animated animate__fadeOutDown": this.startMatch,
            "animate__animated animate__fadeInUp": !this.startMatch,
          }}
        >
          <app-game-player />
          <app-footer />
        </div>
        <archery />
      </div>
    );
  },
};
