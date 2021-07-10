import styles from "./index.module.less";
import AppMenu from "@/components/AppMenu";
import AppHeader from "@/components/AppHeader";
import AppStake from "@/components/AppStake";
import AppChild from "@/components/AppChild";
import AppGamePlayer from "@/components/AppGamePlayer";
import AppFooter from "@/components/AppFooter";
import BetsMixin from "@/mixins/betsMixin";
import CountDownMixin from "@/mixins/countDownMixin";
import AnimationStepMixin from "@/mixins/animationStepMixin";
import Archery from "@/components/Archery";
import AppNotStart from "@/components/AppNotStart";
import { mapState, mapMutations, mapGetters } from "vuex";
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
  mixins: [CountDownMixin, BetsMixin, AnimationStepMixin],
  data() {
    return {};
  },
  mounted() {
    this.start();
  },
  computed: {
    ...mapState(["animationStep"]),
    ...mapGetters(["isGameBettingTime"]),
  },
  methods: {
    ...mapMutations({
      setStartMatchStatus: "SET_START_MATCH_STATUS",
      setCount: "SET_COUNT",
      setAnimationStep: "SET_ANIMATION_STEP",
      setGameBettingStatus: "SET_GAME_BETTING_STATUS",
    }),
    start() {
      if (this.isGameBettingTime) {
        // 倒计时
        this.runCount(5);
        // 动画监听
        this.startMonitorAnimation();
        this.startBetting();
      }
    },
    handleHasStartTime() {
      this.setGameBettingStatus(true);
      this.start();
    },
  },
  render() {
    return (
      <div
        class={{
          [styles.container]: true,
        }}
      >
        {/*  距离下一局开始时间 */}
        <app-not-start endSecond={5} onClose={this.handleHasStartTime} />
        {/* 射箭动画,背景图片也在里面 */}
        <archery vShow={this.animationStep > 0 && this.animationStep < 6} />
        {/* 主体内容 */}
        <div class={styles.content}>
          <div class={styles.topPart}>
            <div
              class={{
                "animate__animated animate__fadeOutDown": this.startMatch,
                "animate__animated animate__fadeInDown": !this.startMatch,
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
