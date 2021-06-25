import styles from "./index.module.less";
import emptyImg from "@/assets/images/empty.png";
export default {
  name: "Empty",
  props: {
    emptyText: {
      type: String,
      default: "暂无记录",
    },
  },
  data() {
    return {};
  },
  render() {
    return (
      <div class={styles.container}>
        <img src={emptyImg} class={styles.img} />
        {this.emptyText}
      </div>
    );
  },
};
