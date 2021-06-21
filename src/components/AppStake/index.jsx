import styles from "./index.module.less";
export default {
  name: "AppStake",
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.group}>
          <div
            id="btnTTVictory"
            class={{
              [styles.groupLeft]: true,
            }}
          >
            <div class={styles.stakeAmount}>7.2w</div>
            <div class={styles.text}>X2.1</div>
          </div>
          <div
            class={{
              [styles.groupCenter]: true,
            }}
          >
            <div class={styles.text}>X9</div>
          </div>
          <div
            id="btnCCVictory"
            class={{
              [styles.groupRight]: true,
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
