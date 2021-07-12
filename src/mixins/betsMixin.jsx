import goldImg from "@/assets/images/gold.png";
import { mapState, mapActions } from "vuex";
import _ from "lodash";
const $ = window.$;

const BetsMixin = {
  data() {
    return {
      betsTimer: null,
    };
  },
  computed: {
    ...mapState([
      "startMatch",
      "count",
      "animationStep",
      "bettingAmount",
      "gameInfo",
    ]),
    currentCountDown() {
      return this.gameCountDown - 15;
    },
    gameCountDown() {
      return _.get(this.gameInfo, "currentGame.countDown") || 0;
    },
  },
  watch: {
    count(newVal) {
      if (newVal < 4) {
        clearInterval(this.betsTimer);
      }
    },
  },
  created() {
    this.$_getGameInfo = _.debounce(this.getGameInfo, 300);
  },
  mounted() {
    this.$nextTick(() => {
      // 监听比赛结果往下撒
      const groupLeftLightEle = document.querySelector(".groupLeftLight");
      groupLeftLightEle.addEventListener("webkitAnimationEnd", () => {
        this.onGetResultAnimation();
      });
    });
  },
  methods: {
    ...mapActions({
      getGameInfo: "getGameInfo",
    }),
    autoBetting() {
      this.betsTimer && clearInterval(this.betsTimer);
      // 5s请求接口获取玩家投注，播放动画
      this.betsTimer = setInterval(() => {
        this.onStartFly($(".player1"), $("#btnTTVictory"));
        this.onStartFly($(".player2"), $("#btnCCVictory"));
        this.onStartFly($(".player4"), $("#btnCCVictory"));
      }, 4000);
    },
    onGamePlay(support = 1, type = 1) {
      const params = {
        support,
        gold: this.bettingAmount,
        uuid: _.get(this.gameInfo, "currentGame.uuid"),
        type,
      };
      this.$service.user.gamePlay(params).then((r) => {
        const code = _.get(r, "data.code");
        this.$_getGameInfo && this.$_getGameInfo();
        if (code === 1000) {
          this.manualBettingAnimation(support);
        } else {
          this.$toast(_.get(r, "data.message"));
        }
      });
    },
    manualBettingAnimation(support) {
      switch (support) {
        case 1:
          this.onStartFly($(".selfPlayer"), $("#btnTTVictory"));
          break;
        case 2:
          this.onStartFly($(".selfPlayer"), $("#btnCCVictory"));
          break;
        case 3:
          this.onStartFly($(".selfPlayer"), $("#btnCenterDrawer"));
          break;
        default:
          break;
      }
    },
    startBetting() {
      this.$nextTick(() => {
        this.autoBetting();
        // 同同获胜
      });
    },
    onStartFly(startTarget, endTarget) {
      if (this.count < 4 && this.animationStep === 0) {
        this.$toast("禁止游戏投注时间");
        return;
      }
      var flyer = $(
        `<img src=${goldImg} style="width:30px;height:30px;position:relative;z-index:5" />`
      ).clone(); //动态创建抛物体对象并克隆
      flyer.load(() => {
        flyer.fly({
          start: {
            left: startTarget.offset().left + startTarget.outerWidth() / 2 - 10, //开始位置（必填）#fly元素会被设置成position: fixed
            top: startTarget.offset().top, //开始位置（必填）
          },
          end: {
            left: endTarget.offset().left + endTarget.outerWidth() / 2, //结束位置（必填）
            top: endTarget.offset().top + endTarget.outerHeight() / 2, //结束位置（必填）
            width: 10, //结束时高度
            height: 10, //结束时高度
          },
          vertex_Rtop: 150,
          speed: 2, //越大越快，默认1.2
          onEnd: function () {
            $(flyer).remove();
          },
        });
      });
    },
    async onGetResultAnimation() {
      [1, 2, 5].forEach((v) => {
        this.onStartFly($("#btnTTVictory"), $(`.player` + v));
      });
      try {
        await this.getGameInfo();
        // 重置条件
        this.setAnimationStep(0);
        this.init && this.init();
        // eslint-disable-next-line no-empty
      } catch {}
    },
    onTtClick() {
      this.onGamePlay(1);
    },
    onDrawerClick() {
      this.onGamePlay(3);
    },
    onCcClick() {
      this.onGamePlay(2);
    },
  },
};
export default BetsMixin;
