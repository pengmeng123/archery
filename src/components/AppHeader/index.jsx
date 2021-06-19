import styles from "./index.module.less";
import IconTongtong from "./images/icon-tongtong.png";
import IconChengcheng from "./images/icon-chengcheng.png";
export default {
  name: "AppHeader",
  data() {
    return {
      players1: [IconTongtong, IconTongtong, IconTongtong, IconTongtong],
      players2: [
        IconChengcheng,
        IconChengcheng,
        IconChengcheng,
        IconChengcheng,
      ],
    };
  },
  render() {
    const { players1, players2 } = this;
    return (
      <div class={styles.container}>
        <div class={styles.header}>
          <div class={styles.players}>
            <ul>
              {players1.map((v) => (
                <li>
                  <img src={v} />
                </li>
              ))}
            </ul>
          </div>
          <div class={styles.countDown}>15</div>
          <div class={styles.players}>
            <ul>
              {players2.map((v) => (
                <li>
                  <img src={v} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  },
};
