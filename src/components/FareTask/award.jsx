import styles from "./index.module.less";
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
  methods: {
    onCheck() {
      this.$router.push("/exchange?openRecord=true");
    },
  },
  render() {
    const { record } = this;
    return (
      <div class={styles.awardContent}>
        <img
          src="https://file.40017.cn/huochepiao/activity/arrowtest/static/award-title.png"
          class={styles.title}
        />
        <div
          style={{
            margin: "10px 0 0 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CreditCard type={record.type} amount={record.amount} />
        </div>
        <div class={styles.name}>
          {getAwardName(record.type, record.amount)}
        </div>
        <a href="javascript:" class={styles.btnCheck} onClick={this.onCheck}>
          去查看
        </a>
      </div>
    );
  },
};
