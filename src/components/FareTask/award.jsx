import styles from "./index.module.less";
import AwardTitleImg from "@/assets/images/award-title.png";
import Prize from "../Prize";
export default {
  name: "FareTaskAward",
  render() {
    return (
      <div class={styles.awardContent}>
        <img src={AwardTitleImg} class={styles.title} />
        <Prize />
        <div class={styles.name}>10元火车票立减券</div>
        <a href="javascript:" class={styles.btnCheck}>
          去查看
        </a>
      </div>
    );
  },
};
