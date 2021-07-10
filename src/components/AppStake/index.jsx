import styles from "./index.module.less";
import { mapState } from "vuex";
export default {
  name: "AppStake",
  computed: {
    ...mapState(["startMatch", "animationStep"]),
  },
  render() {
    const { startMatch, animationStep } = this;
    return (
      <div class={styles.container}>
        <div class={styles.group}>
          {/* 光部分 */}
          <div
            class={{
              groupLeftLight: true,
              [styles.groupLeftLight]: animationStep === 6,
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
            <div class={styles.text}>X2.1</div>
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
            <div class={styles.text}>X9</div>
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
            <div class={styles.text}>X2.1</div>
          </div>
        </div>
      </div>
    );
  },
};
