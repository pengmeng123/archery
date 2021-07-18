import styles from "./index.module.less";
import PrizeImg from "@/assets/images/prize.png";
import PrizeBgImg from "@/assets/images/prize-bg.png";
export default {
  name: "DailyReceiveGold",
  props: {
    awardGoldNumber: {
      type: Number,
    },
  },
  render() {
    return (
      <div class={styles.container}>
        <img src={PrizeBgImg} class={styles.prizeBg} />
        <img src={PrizeImg} class={styles.prize} />
        <div class={styles.title}>+{this.awardGoldNumber}金币</div>
        <span class={styles.desc}>恭喜获得，继续加油！</span>
      </div>
    );
  },
};
