import styles from "./index.module.less";
import { mapState } from "vuex";
import _ from "lodash";
export default {
  name: "AppStake",
  computed: {
    ...mapState(["startMatch", "animationStep", "gameInfo"]),
  },
  render() {
    const { startMatch, animationStep, gameInfo } = this;
    return (
      <div class={styles.container}>
        <div class={styles.group}>
          {/* 光部分 */}
          <div
            class={{
              groupLeftLight: true,
              [styles.groupLeftLight]: animationStep === 6,
              // [styles.groupLeftLight]: true,
            }}
          ></div>
          {/* <div
            class={{
              groupCenterLight: true,
              [styles.groupCenterLight]: animationStep === 6,
            }}
          ></div>
          <div
            class={{
              groupRightLight: true,
              [styles.groupRightLight]: animationStep === 6,
            }}
          ></div> */}
          <div
            id="btnTTVictory"
            class={{
              [styles.groupLeft]: true,
              "animate__animated animate__fadeOutLeft": startMatch,
              "animate__animated animate__fadeInLeft": !startMatch,
            }}
          >
            <div class={styles.stakeAmountContainer}>
              <div class={styles.stakeAmount}>72.2w</div>
              {/* <div
                class={{
                  [styles.stakeAmount]: true,
                  [styles.stakeGrey]: true,
                }}
              >
                7.2w
              </div> */}
            </div>
            <div class={styles.text}>
              X{_.get(gameInfo, "currentGame.fish.odds")}
            </div>
          </div>
          <div
            id="btnCenterDrawer"
            class={{
              [styles.groupCenter]: true,
              "animate__animated animate__fadeOutDown": startMatch,
              "animate__animated animate__fadeInDown": !startMatch,
            }}
          >
            <div class={styles.stakeAmountContainer}>
              <div class={styles.stakeAmount}>72.2w</div>
              <div
                class={{
                  [styles.stakeAmount]: true,
                  [styles.stakeGrey]: true,
                }}
              >
                7.2w
              </div>
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
              "animate__animated animate__fadeInRight": !startMatch,
            }}
          >
            <div class={styles.stakeAmountContainer}>
              <div class={styles.stakeAmount}>72.2w</div>
              <div
                class={{
                  [styles.stakeAmount]: true,
                  [styles.stakeGrey]: true,
                }}
              >
                7.2w
              </div>
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
