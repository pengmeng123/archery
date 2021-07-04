import styles from "./index.module.less";
import AppMenu from "@/components/AppMenu";
import AppHeader from "@/components/AppHeader";
import AppStake from "@/components/AppStake";
import AppChild from "@/components/AppChild";
import AppGamePlayer from "@/components/AppGamePlayer";
import AppFooter from "@/components/AppFooter";
import BetsMixin from "@/mixins/betsMixin";
import Archery from "@/components/Archery";
import AppNotStart from "@/components/AppNotStart";
import { mapState } from "vuex";
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
    AppNotStart,
  },
  mixins: [BetsMixin],
  data() {
    return {
      isScale: false,
    };
  },
  mounted() {},
  computed: {
    ...mapState(["startBgAnimation"]),
  },
  methods: {},
  render() {
    return (
      <div
        class={{
          [styles.container]: true,
        }}
      >
        {/*  距离下一局开始时间 */}
        <app-not-start endSecond={5} />
        {/* 射箭动画,背景图片也在里面 */}
        <archery />
        {/* 主体内容 */}
        <div class={styles.content}>
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
        </div>
      </div>
    );
  },
};
