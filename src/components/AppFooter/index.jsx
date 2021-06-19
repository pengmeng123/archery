import styles from "./index.module.less";
export default {
  name: "AppFooter",
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.content}>
          <div class={styles.myGold}>
            <div class={styles.title}>我的金币</div>
            <div class={styles.text}>100000</div>
          </div>
          <div class={styles.btnGroup}>
            <ul>
              <li class={styles.active}>
                <i></i>
                <div class={styles.amount50}></div>
              </li>
              <li style="margin:0 5px">
                <i></i>
                <div class={styles.amount100}></div>
              </li>
              <li>
                <i></i>
                <div class={styles.amount1000}></div>
              </li>
            </ul>
          </div>
          <a href="javascript:" class={styles.btnCancel}></a>
        </div>
      </div>
    );
  },
};
