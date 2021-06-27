import styles from "./index.module.less";
export default {
  name: "AppPercent",
  functional: true,
  render(h, { props }) {
    return (
      <div class={styles.container}>
        <div class={styles.innerContainer}>
          <div
            class={styles.innerPercent}
            style={{
              width: `${(props.receive / props.total) * 100}%`,
            }}
          ></div>
        </div>
        <span class={styles.desc}>
          {props.receive}/{props.total}
        </span>
      </div>
    );
  },
};
