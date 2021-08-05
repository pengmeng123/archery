import styles from "./index.module.less";
export default {
  name: "Maintenance",
  render() {
    return (
      <div class={styles.container}>
        <img
          class={styles.icon}
          src="https://file.40017.cn/huochepiao/activity/arrowtest/static/maintenance.png"
          alt=""
        />
        <div class={styles.title}>十分抱歉 系统升级中</div>
      </div>
    );
  },
};
