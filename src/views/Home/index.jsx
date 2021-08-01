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
import AppLoading from "@/components/AppLoading";
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
  data() {
    return {
      resultTimer1: null,
      resultTimer2: null,
      resultTimer3: null,
    };
  },
  async mounted() {
    try {
      await this.fetchRequest();
      this.monitorResultAnimation();
      // eslint-disable-next-line no-empty
    } catch {}
  },
  computed: {
    ...mapState(["animationStep", "gameInfo", "count", "appLoading"]),
    ...mapGetters(["isGameBettingTime"]),
  },
  watch: {
    count: {
      handler(newVal) {
        // 倒计时结束去拿这一局的中奖信息
        if (newVal === 0) {
          console.log("watch-count----");
          this.setStartMatchStatus(true);
          this.setAnimationStep(1);
          this.resultTimer3 && clearTimeout(this.resultTimer3);
          this.resultTimer3 = setTimeout(() => {
            this.getResult();
          }, 1000);
          // this.testTimer && clearInterval(this.testTimer);
          // this.testCount = 0;
          // this.testTimer = setInterval(() => {
          //   console.log("testCount--", this.testCount);
          //   this.testCount++;
          // }, 1000);
        }
      },
    },
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
      setResultGameInfo: "SET_RESULT_GAME_INFO",
      setTimes: "SET_TIMES",
      setGameInfo: "SET_GAME_INFO",
    }),
    fetchRequest() {
      return new Promise((resolve, reject) => {
        this.onReset();
        return this.getGameInfo()
          .then((r) => {
            if (_.get(r, "data.code") === 1000) {
              this.init();
              // 主页接口信息;
              this.getGameMainInfo();
              resolve();
            } else {
              if (!_.get(r, "data.code")) {
                this.onReset();
                this.$router.push({
                  name: "Disconnection",
                });
              } else {
                this.$toast(_.get(r, "data.message"));
              }
              reject();
            }
          })
          .catch(() => {
            this.onReset();
            this.$router.push({
              name: "Disconnection",
            });
            reject();
          });
      });
    },
    init() {
      // 判断时间是否在可投注范围内
      if (this.currentCountDown > 1) {
        this.setGameBettingStatus(true);
        this.start();
      } else {
        if (this.gameCountDown === 0) {
          this.handleHasStartTime();
        } else {
          this.setGameBettingStatus(false);
        }
      }
    },
    start() {
      if (this.isGameBettingTime) {
        this.updateContDown();
        // 动画监听
        this.startMonitorAnimation();
        this.startBetting();
      }
    },
    updateContDown() {
      // 倒计时
      this.runCount(this.currentCountDown);
    },
    handleHasStartTime() {
      // 清空(解决这一句如果投注了，这里会闪一下投注数量，体验不好)
      if (!_.isEmpty(this.gameInfo)) {
        this.setGameInfo({
          account: this.gameInfo.account,
          currentGame: {},
          historyGameList: this.gameInfo.historyGameList,
        });
      } else {
        this.setGameInfo({});
      }

      this.fetchRequest();
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
    getResultExcute() {
      return this.$service.user.getExcute().then((r) => {
        if (
          !_.isNil(_.get(r, "data.result.currentGame.gameResult")) &&
          _.get(r, "data.code") === 1000
        ) {
          this.setResultGameInfo(_.get(r, "data.result"));
        } else {
          // 出现频繁请求的情况提示
          this.$toast(_.get(r, "data.message"));
        }
        return r;
      });
    },
    async getResult() {
      this.resultTimer1 && clearTimeout(this.resultTimer1);
      this.resultTimer2 && clearTimeout(this.resultTimer2);
      try {
        const r = await this.getResultExcute();
        const o = _.get(r, "data.result") || {};
        const result = !_.isEmpty(o)
          ? _.keyBy(_.get(o, "currentGame.result"), "result")
          : null;
        if (!_.isNil(result)) {
          this.resultTimer1 = setTimeout(() => {
            this.getResultExcute();
          }, 1000);
          // 这里延迟2s再次请求，是因为可能第一次拿到的结果不准
          this.resultTimer2 = setTimeout(() => {
            this.getResultExcute();
          }, 10000);
        } else {
          // 如果结果没有拿到就重置页面，防止页面不动了
          this.fetchRequest();
        }

        // eslint-disable-next-line no-empty
      } catch {}
    },
    renderLoading() {
      return <AppLoading />;
    },
    onReset() {
      this.setCount(-1);
      this.setAnimationStep(0);
      this.setStartMatchStatus(false);
      this.setTimes(0);
      this.setGameBettingStatus(true);
      this.clearTimer && this.clearTimer();
      this.timerCount && clearTimeout(this.timerCount);
      this.resultTimer1 && clearTimeout(this.resultTimer1);
      this.resultTimer2 && clearTimeout(this.resultTimer2);
      this.resultTimer3 && clearTimeout(this.resultTimer3);
      this.removeAddEventListenerFun();
      this.animationStepClearTimer();
    },
  },
  beforeDestroy() {
    this.onReset();
  },
  render() {
    // if (this.appLoading) {
    //   return this.renderLoading();
    // }
    return (
      <div
        class={{
          [styles.container]: true,
          [styles.containerAnimation]:
            this.animationStep >= 3 && this.animationStep < 6,
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
              onTtClick={this.onTtClick}
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
