import styles from "./index.module.less";
import { mapState } from "vuex";
export default {
  name: "AppChild",
  computed: {
    ...mapState(["startMatch"]),
  },
  render() {
    const { startMatch } = this;
    return (
      <div class={styles.container}>
        <div
          class={{
            [styles.member]: true,
            [styles.memberTT]: true,
            "animate__animated animate__fadeOutLeft": startMatch,
          }}
        >
          <img
            src="https://file.40017.cn/huochepiao/activity/arrowtest/static/tt-signs.png"
            class={styles.signs}
          />
          <img
            src="https://file.40017.cn/huochepiao/activity/arrowtest/static/tongtong.png"
            class={styles.memberImg}
          />
        </div>
        <div
          class={{
            [styles.member]: true,
            [styles.memberCC]: true,
            "animate__animated animate__fadeOutRight": startMatch,
          }}
        >
          <img
            src="https://file.40017.cn/huochepiao/activity/arrowtest/static/cc-signs.png"
            class={styles.signs}
          />
          <img
            src="https://file.40017.cn/huochepiao/activity/arrowtest/static/chengcheng.png"
            class={styles.memberImg}
          />
        </div>
      </div>
    );
  },
};
