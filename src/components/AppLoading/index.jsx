import styles from "./index.module.less";
export default {
  name: "AppLoading",
  render() {
    return (
      <div class={styles.container}>
        <div class={styles["percent-container"]}>
          <div class={styles.box}>
            <div class={styles.inner}></div>
          </div>
          努力加载中....
        </div>
      </div>
    );
  },
};
