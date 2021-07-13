import styles from "./index.module.less";
import { mapState, mapGetters } from "vuex";
import _ from "lodash";
export default {
  name: "AppStake",
  computed: {
    ...mapState(["startMatch", "animationStep", "gameInfo"]),
    ...mapGetters(["gameResult"]),
    fishTotal() {
      const { gameInfo } = this;
      return (
        (_.get(gameInfo, "currentGame.fish.account") || 0) +
        (this.fishPlayListMount || 0)
      );
    },
    fishPlayListMount() {
      const { gameInfo } = this;
      const arr = (_.get(gameInfo, "currentGame.playerList") || []).filter(
        (v) => v.bet === 1
      );
      return arr.length
        ? arr.reduce((sum, v) => {
            return sum + v.account;
          }, 0)
        : 0;
    },
    longPersonTotal() {
      const { gameInfo } = this;
      return (
        (_.get(gameInfo, "currentGame.longPerson.account") || 0) +
        (this.longPlayListMount || 0)
      );
    },
    longPlayListMount() {
      const { gameInfo } = this;
      const arr = (_.get(gameInfo, "currentGame.playerList") || []).filter(
        (v) => v.bet === 2
      );
      return arr.length
        ? arr.reduce((sum, v) => {
            return sum + v.account;
          }, 0)
        : 0;
    },
    drawTotal() {
      const { gameInfo } = this;
      return (
        (_.get(gameInfo, "currentGame.draw.account") || 0) +
        (this.drawPlayListMount || 0)
      );
    },
    drawPlayListMount() {
      const { gameInfo } = this;
      const arr = (_.get(gameInfo, "currentGame.playerList") || []).filter(
        (v) => v.bet === 3
      );
      return arr.length
        ? arr.reduce((sum, v) => {
            return sum + v.account;
          }, 0)
        : 0;
    },
  },
  methods: {
    handleBetting(direct) {
      this.$emit(direct);
    },
  },
  render() {
    const { startMatch, animationStep, gameInfo } = this;
    const result = _.get(this.gameResult, "result");
    console.log("result---", result);
    return (
      <div class={styles.container}>
        <div class={styles.group}>
          {/* 光部分 */}
          <div
            vShow={result === 1}
            class={{
              groupLeftLight: true,
              [styles.groupLeftLight]: animationStep === 6,
            }}
          ></div>
          <div
            vShow={result === 3}
            class={{
              groupCenterLight: true,
              [styles.groupCenterLight]: animationStep === 6,
            }}
          ></div>
          <div
            vShow={result === 2}
            class={{
              groupRightLight: true,
              [styles.groupRightLight]: animationStep === 6,
            }}
          ></div>
          <div
            id="btnTTVictory"
            class={{
              [styles.groupLeft]: true,
              "animate__animated animate__fadeOutLeft": startMatch,
            }}
            onClick={() => {
              this.handleBetting("ttClick");
            }}
          >
            <div class={styles.stakeAmountContainer}>
              {this.fishTotal ? (
                <div class={styles.stakeAmount}>{this.fishTotal}</div>
              ) : null}
              {this.fishPlayListMount ? (
                <div
                  class={{
                    [styles.stakeAmount]: true,
                    [styles.stakeGrey]: true,
                  }}
                >
                  {this.fishPlayListMount}
                </div>
              ) : null}
            </div>
            <div class={styles.text}>
              X{_.get(gameInfo, "currentGame.fish.odds")}
            </div>
          </div>
          <div
            id="btnCenterDrawer"
            class={{
              [styles.groupCenter]: true,
              "animate__animated animate__fadeOut": startMatch,
            }}
            onClick={() => {
              this.handleBetting("drawerClick");
            }}
          >
            <div class={styles.stakeAmountContainer}>
              {this.drawTotal ? (
                <div class={styles.stakeAmount}>{this.drawTotal}</div>
              ) : null}
              {this.drawPlayListMount ? (
                <div
                  class={{
                    [styles.stakeAmount]: true,
                    [styles.stakeGrey]: true,
                  }}
                >
                  {this.drawPlayListMount}
                </div>
              ) : null}
            </div>
            <div class={styles.text}>
              X{_.get(gameInfo, "currentGame.draw.odds")}
            </div>
          </div>
          <div
            id="btnCCVictory"
            class={{
              [styles.groupRight]: true,
              "animate__animated animate__fadeOutRight": startMatch,
            }}
            onClick={() => {
              this.handleBetting("ccClick");
            }}
          >
            <div class={styles.stakeAmountContainer}>
              {this.longPersonTotal ? (
                <div class={styles.stakeAmount}>{this.longPersonTotal}</div>
              ) : null}
              {this.longPlayListMount ? (
                <div
                  class={{
                    [styles.stakeAmount]: true,
                    [styles.stakeGrey]: true,
                  }}
                >
                  {this.longPlayListMount}
                </div>
              ) : null}
            </div>
            <div class={styles.text}>
              X{_.get(gameInfo, "currentGame.draw.odds")}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
