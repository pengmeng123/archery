import styles from "./index.module.less";
export default {
  name: "Loading",
  render() {
    return (
      <div class={styles.container}>
        <div
          class={{
            [styles.ispinner]: true,
            [styles.white]: true,
            [styles.large]: true,
            [styles.animating]: true,
          }}
        >
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
          <div class={{ [styles["ispinner-blade"]]: true }}></div>
        </div>
      </div>
    );
  },
};
