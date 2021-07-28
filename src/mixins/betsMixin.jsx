import goldImg from "@/assets/images/gold.png";
import { mapState, mapActions, mapGetters } from "vuex";
import _ from "lodash";
const $ = window.$;
const BEETING_COUNT = 15;
const NO_BETTING_COUNT = 3;
const BetsMixin = {
  data() {
    return {
      betsTimer: null,
      oldPlayList: [],
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
    ...mapGetters(["gameResult"]),
    currentCountDown() {
      return this.gameCountDown - BEETING_COUNT;
    },
    gameCountDown() {
      return _.get(this.gameInfo, "currentGame.countDown") || 0;
    },
    myBetResult() {
      return _.get(this.gameResult, "mybet") || [];
    },
    playerListResult() {
      return _.get(this.gameResult, "playerList") || [];
    },
  },
  watch: {
    count(newVal) {
      if (newVal < NO_BETTING_COUNT) {
        this.clearTimer();
      }
    },
  },
  created() {
    this.$_getGameInfo = _.debounce(this.getGameInfo, 100);
  },
  methods: {
    ...mapActions({
      getGameInfo: "getGameInfo",
    }),
    monitorResultAnimation() {
      this.$nextTick(() => {
        // 监听比赛结果往下撒
        const groupLeftLightEle = document.querySelector(".groupLeftLight");
        const groupCenterLightEle = document.querySelector(".groupCenterLight");
        const groupRightLightEle = document.querySelector(".groupRightLight");
        groupLeftLightEle.addEventListener(
          "webkitAnimationEnd",
          () => {
            this.onGetResultAnimation($("#btnTTVictory"));
          },
          false
        );
        groupCenterLightEle.addEventListener(
          "webkitAnimationEnd",
          () => {
            this.onGetResultAnimation($("#btnCenterDrawer"));
          },
          false
        );
        groupRightLightEle.addEventListener(
          "webkitAnimationEnd",
          () => {
            this.onGetResultAnimation($("#btnCCVictory"));
          },
          false
        );
      });
    },
    removeAddEventListenerFun() {
      const groupLeftLightEle = document.querySelector(".groupLeftLight");
      const groupCenterLightEle = document.querySelector(".groupCenterLight");
      const groupRightLightEle = document.querySelector(".groupRightLight");
      groupLeftLightEle &&
        groupLeftLightEle.removeEventListener(
          "webkitAnimationEnd",
          function (event) {
            event.preventDefault();
          },
          false
        );
      groupCenterLightEle &&
        groupCenterLightEle.removeEventListener(
          "webkitAnimationEnd",
          function (event) {
            event.preventDefault();
          },
          false
        );
      groupRightLightEle &&
        groupRightLightEle.removeEventListener(
          "webkitAnimationEnd",
          function (event) {
            event.preventDefault();
          },
          false
        );
    },
    clearTimer() {
      this.betsTimer && clearInterval(this.betsTimer);
    },
    autoBetting() {
      this.clearTimer();
      // 5s请求接口获取玩家投注，播放动画
      this.betsTimer = setInterval(() => {
        this.getGameInfo().then(() => {
          this.updateContDown && this.updateContDown();
          this.autoPayListBetting();
        });
      }, 3000);
    },
    autoPayListBetting() {
      // 定时获取其它玩家列表的投注情况
      const newPlayList = _.get(this.gameInfo, "currentGame.playerList") || [];
      const oldPlayList = [...this.oldPlayList];
      const oldIds = oldPlayList.map((v) => v.uuid);
      newPlayList.forEach((r) => {
        // 当前玩家非首次投注
        if (oldIds.includes(r.uuid)) {
          const o = _.find(oldPlayList, { uuid: r.uuid }) || {};
          this.runOldPlayListAnimation(o, r);
        } else {
          this.runNewPlayListAnimation(r);
        }
      });
      this.oldPlayList = _.uniqBy(
        [...newPlayList, ...this.oldPlayList],
        "uuid"
      );
    },
    runNewPlayListAnimation(r) {
      const result = _.get(r, "bet") || [];
      const ele = `.player-${r.uuid}`;
      result.forEach((v) => {
        switch (v.result) {
          case 1:
            if (_.get(v, "account") < 0) {
              this.onStartFly($(ele), $("#btnTTVictory"));
            }
            break;
          case 2:
            if (_.get(v, "account") < 0) {
              this.onStartFly($(ele), $("#btnCCVictory"));
            }
            break;
          case 3:
            if (_.get(v, "account") < 0) {
              this.onStartFly($(ele), $("#btnCenterDrawer"));
            }
            break;
          default:
            break;
        }
      });
    },
    runOldPlayListAnimation(oldObj, newObj) {
      const result = _.get(newObj, "bet") || [];
      const ele = `.player-${newObj.uuid}`;
      const oldBet = _.get(oldObj, "bet") || [];
      result.forEach((v) => {
        switch (v.result) {
          case 1:
            // eslint-disable-next-line no-case-declarations
            let o1 = _.find(oldBet, { result: 1 });
            if (_.get(o1, "account") > _.get(v, "account")) {
              this.onStartFly($(ele), $("#btnTTVictory"));
            }
            break;
          case 2:
            // eslint-disable-next-line no-case-declarations
            let o2 = _.find(oldBet, { result: 2 });
            if (_.get(o2, "account") > _.get(v, "account")) {
              this.onStartFly($(ele), $("#btnCCVictory"));
            }
            break;
          case 3:
            // eslint-disable-next-line no-case-declarations
            let o3 = _.find(oldBet, { result: 3 });
            if (_.get(o3, "account") > _.get(v, "account")) {
              this.onStartFly($(ele), $("#btnCenterDrawer"));
            }
            break;
          default:
            break;
        }
      });
    },
    onGamePlay(support = 1, type = 1) {
      if (this.count < NO_BETTING_COUNT) {
        this.clearTimer();
        this.$toast(`停止${type === 1 ? "支持" : "撤销"}时间`);
        return;
      }
      this.startBetting();
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
          type == 1 && this.manualBettingAnimation(support);
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
      if (this.count < 2 && this.animationStep === 0) {
        this.clearTimer();
        this.$toast("停止支持时间");
        return;
      }
      var flyer = $(
        `<img src=${goldImg} style="width:30px;height:30px;position:relative;z-index:5" />`
      ).clone(); //动态创建抛物体对象并克隆
      const endTargetOffset = endTarget.offset();
      flyer.load(() => {
        flyer.fly({
          start: {
            left: startTarget.offset().left + startTarget.outerWidth() / 2 - 10, //开始位置（必填）#fly元素会被设置成position: fixed
            top: startTarget.offset().top, //开始位置（必填）
          },
          end: {
            left:
              ((endTargetOffset && endTargetOffset.left) || 0) +
              endTarget.outerWidth() / 2, //结束位置（必填）
            top:
              ((endTargetOffset && endTargetOffset.top) || 0) +
              endTarget.outerHeight() / 2, //结束位置（必填）
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
    runResultAnimation(element) {
      return new Promise((resolve) => {
        this.myBetResult.forEach((r) => {
          switch (r.result) {
            case 1:
              if (_.get(r, "account") > 0) {
                this.onStartFly($("#btnTTVictory"), $(".selfPlayer"));
              }
              break;
            case 2:
              if (_.get(r, "account") > 0) {
                this.onStartFly($("#btnCCVictory"), $(".selfPlayer"));
              }
              break;
            case 3:
              if (_.get(r, "account") > 0) {
                this.onStartFly($("#btnCenterDrawer"), $(".selfPlayer"));
              }
              break;
            default:
              break;
          }
        });
        this.playerListResult.forEach((v) => {
          const bets = _.get(v, "bet") || [];
          const ele = `.player-${v.uuid}`;
          if (!($(ele) && $(ele).length)) {
            return;
          }
          bets.forEach((r) => {
            switch (r.result) {
              case 1:
                if (_.get(r, "account") > 0) {
                  this.onStartFly(element, $(ele));
                }
                break;
              case 2:
                if (_.get(r, "account") > 0) {
                  this.onStartFly(element, $(ele));
                }
                break;
              case 3:
                if (_.get(r, "account") > 0) {
                  this.onStartFly(element, $(ele));
                }
                break;
              default:
                break;
            }
          });
        });
        resolve();
      });
    },
    async onGetResultAnimation(ele) {
      if (!ele) {
        return Promise.resolve();
      }
      try {
        await this.runResultAnimation(ele);
        setTimeout(async () => {
          await this.getGameInfo();
          // 重置条件
          this.setAnimationStep(0);
          this.init && this.init();
          this.getGameMainInfo && this.getGameMainInfo();
        }, 200);
      } catch {
        this.init && this.init();
        this.getGameMainInfo && this.getGameMainInfo();
      }
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
