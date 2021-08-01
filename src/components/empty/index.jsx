import styles from "./index.module.less";
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
        <img
          src="https://file.40017.cn/huochepiao/activity/arrowtest/static/empty.png"
          class={styles.img}
        />
        {this.emptyText}
      </div>
    );
  },
};
