import styles from "./index.module.less";
import CCSignsImg from "./images/cc-signs.png";
import TTSignsImg from "./images/tt-signs.png";
import TongtongImg from "./images/tongtong.png";
import ChengchengImg from "./images/chengcheng.png";
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
        {/* <div class={styles.target}>
          <img src={TargetImg} />
        </div> */}
        {/* <div class={styles.position}></div> */}
        <div
          class={{
            [styles.member]: true,
            [styles.memberTT]: true,
            "animate__animated animate__fadeOutLeft": startMatch,
            // "animate__animated animate__fadeInLeft": !startMatch,
          }}
        >
          <img src={TTSignsImg} class={styles.signs} />
          <img src={TongtongImg} class={styles.memberImg} />
        </div>
        <div
          class={{
            [styles.member]: true,
            [styles.memberCC]: true,
            "animate__animated animate__fadeOutRight": startMatch,
            // "animate__animated animate__fadeInRight": !startMatch,
          }}
        >
          <img src={CCSignsImg} class={styles.signs} />
          <img src={ChengchengImg} class={styles.memberImg} />
        </div>
      </div>
    );
  },
};
