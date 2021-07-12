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
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import _ from "lodash";
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
  mounted() {
    this.init();
  },
  computed: {
    ...mapState(["animationStep", "gameInfo"]),
    ...mapGetters(["isGameBettingTime"]),
  },
  methods: {
    ...mapActions({
      getGameInfo: "getGameInfo",
    }),
    ...mapMutations({
      setStartMatchStatus: "SET_START_MATCH_STATUS",
      setCount: "SET_COUNT",
      setAnimationStep: "SET_ANIMATION_STEP",
      setGameBettingStatus: "SET_GAME_BETTING_STATUS",
      setMainInfo: "SET_MAIN_INFO",
    }),
    init() {
      // 判断时间是否在可投注范围内
      if (this.currentCountDown > 0) {
        this.setGameBettingStatus(true);
        this.start();
      } else {
        this.setGameBettingStatus(false);
      }
      // 主页接口信息
      this.getGameMainInfo();
    },
    start() {
      if (this.isGameBettingTime) {
        // 倒计时
        this.runCount(this.currentCountDown);
        // 动画监听
        this.startMonitorAnimation();
        this.startBetting();
      }
    },
    async handleHasStartTime() {
      await this.getGameInfo();
      this.init();
    },
    handleBettingCancel() {
      this.onGamePlay(1, 2);
    },
    getGameMainInfo() {
      this.$service.user.gameMainInfo().then((r) => {
        const o = _.get(r, "data.result") || {};
        this.setMainInfo(o);
      });
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
        {!this.isGameBettingTime ? (
          <app-not-start
            endSecond={Math.abs(this.gameCountDown)}
            onClose={this.handleHasStartTime}
          />
        ) : null}
        {/* 射箭动画,背景图片也在里面 */}
        <archery vShow={this.animationStep > 0 && this.animationStep < 6} />
        {/* 主体内容 */}
        <div class={styles.content}>
          <div class={styles.topPart}>
            <div
              class={{
                "animate__animated animate__fadeOutUp": this.startMatch,
              }}
              style="position:relative;z-index:2"
            >
              <app-menu />
              <app-header />
            </div>
            <app-stake
              onDrawerClick={this.onDrawerClick}
              onCcClick={this.onCcClick}
            />
            <app-child />
          </div>
          <div
            class={{
              "animate__animated animate__fadeOutDown": this.startMatch,
            }}
          >
            <app-game-player />
            <app-footer onCancel={this.handleBettingCancel} />
          </div>
        </div>
      </div>
    );
  },
};
