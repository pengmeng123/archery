import styles from "./index.module.less";
import AwardTitleImg from "@/assets/images/award-title.png";
import CreditCard from "../CreditCard";
import { getAwardName } from "@/utils/get-award-name";
export default {
  name: "FareTaskAward",
  props: {
    record: {
      type: Object,
      default: () => ({}),
    },
  },
  render() {
    const { record } = this;
    return (
      <div class={styles.awardContent}>
        <img src={AwardTitleImg} class={styles.title} />
        <div
          style={{
            margin: "0 auto",
          }}
        >
          <CreditCard type={record.type} amount={record.amount} />
        </div>
        <div class={styles.name}>
          {getAwardName(record.type, record.amount)}
        </div>
        <a href="javascript:" class={styles.btnCheck}>
          去查看
        </a>
      </div>
    );
  },
};
