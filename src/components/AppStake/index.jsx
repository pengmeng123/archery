import styles from "./index.module.less";
export default {
  name: "AppStake",
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.group}>
          <div class={styles.groupLeft}>
            <div class={styles.stakeAmount}>7.2w</div>
            <div class={styles.text}>X2.1</div>
          </div>
          <div class={styles.groupCenter}>
            <div class={styles.text}>X9</div>
          </div>
          <div class={styles.groupRight}>
            <div class={styles.stakeAmount}>7.2w</div>
            <div class={styles.text}>X2.1</div>
          </div>
        </div>
      </div>
    );
  },
};
