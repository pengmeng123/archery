import styles from "./index.module.less";
export default {
  name: "DailyReceiveGold",
  props: {
    awardGoldNumber: {
      type: [Number, String],
    },
  },
  render() {
    return (
      <div class={styles.container}>
        <img
          src="https://file.40017.cn/huochepiao/activity/arrowtest/static/prize-bg.png"
          class={styles.prizeBg}
        />
        <img
          src="https://file.40017.cn/huochepiao/activity/arrowtest/static/prize.png"
          class={styles.prize}
        />
        <div class={styles.title}>+{this.awardGoldNumber}金币</div>
        <span class={styles.desc}>恭喜获得，继续加油！</span>
      </div>
    );
  },
};
