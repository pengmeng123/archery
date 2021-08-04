import styles from "./index.module.less";
export default {
  name: "PhoneBillCheck",
  props: {
    phone: {
      type: String,
    },
  },
  render() {
    return (
      <div class={styles.container}>
        <img
          src="https://file.40017.cn/huochepiao/activity/arrowtest/static/recharged.png"
          alt=""
          class={styles.title}
        />
        <div class={styles.recharged}>
          <img
            src="https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-recharged.png"
            alt=""
            class={styles.iconCharged}
          />
          <div class={styles.label}>充值手机号：</div>
          <div class={styles.text}>{this.phone}</div>
        </div>
      </div>
    );
  },
};
