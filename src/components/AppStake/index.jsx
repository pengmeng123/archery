import styles from "./index.module.less";
import { mapState } from "vuex";
export default {
  name: "AppStake",
  computed: {
    ...mapState(["startMatch"]),
  },
  render() {
    const { startMatch } = this;
    return (
      <div class={styles.container}>
        <div class={styles.group}>
          <div
            id="btnTTVictory"
            class={{
              [styles.groupLeft]: true,
              "animate__animated animate__fadeOutLeft": startMatch,
            }}
          >
            <div class={styles.stakeAmount}>7.2w</div>
            <div class={styles.text}>X2.1</div>
          </div>
          <div
            class={{
              [styles.groupCenter]: true,
              "animate__animated animate__fadeOut": startMatch,
            }}
          >
            <div class={styles.text}>X9</div>
          </div>
          <div
            id="btnCCVictory"
            class={{
              [styles.groupRight]: true,
              "animate__animated animate__fadeOutRight": startMatch,
            }}
          >
            <div class={styles.stakeAmount}>7.2w</div>
            <div class={styles.text}>X2.1</div>
          </div>
        </div>
      </div>
    );
  },
};
