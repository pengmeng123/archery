import styles from "./index.module.less";
export default {
  name: "Archery",
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.target}>
          <div class={styles.box}></div>
        </div>
      </div>
    );
  },
};
