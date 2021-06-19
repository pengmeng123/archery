import styles from "./index.module.less";
import TargetImg from "./images/target.png";
import CCSignsImg from "./images/cc-signs.png";
import TTSignsImg from "./images/tt-signs.png";
import TongtongImg from "./images/tongtong.png";
import ChengchengImg from "./images/chengcheng.png";
export default {
  name: "AppChild",
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.target}>
          <img src={TargetImg} />
        </div>
        <div class={styles.position}></div>
        <div
          class={{
            [styles.member]: true,
            [styles.memberTT]: true,
          }}
        >
          <img src={TTSignsImg} class={styles.signs} />
          <img src={TongtongImg} class={styles.memberImg} />
        </div>
        <div
          class={{
            [styles.member]: true,
            [styles.memberCC]: true,
          }}
        >
          <img src={CCSignsImg} class={styles.signs} />
          <img src={ChengchengImg} class={styles.memberImg} />
        </div>
      </div>
    );
  },
};
