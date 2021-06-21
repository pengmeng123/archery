import styles from "./index.module.less";
import TxImg from "./images/tx.png";
import TxBgImg from "./images/tx-bg.png";

export default {
  name: "AppGamePlayer",
  computed: {
    members() {
      return [
        {
          icon: TxImg,
          name: "张三1",
          className: "player1",
        },
        {
          icon: TxImg,
          name: "张三2",
          className: "player2",
        },
        {
          icon: TxImg,
          name: "李四",
          marjor: true,
          className: "selfPlayer",
        },
        {
          icon: TxImg,
          name: "张三3",
          className: "player3",
        },
        {
          icon: TxImg,
          name: "张三4",
          className: "player4",
        },
      ];
    },
  },
  render() {
    const { members } = this;
    return (
      <div class={styles.container}>
        <ul class={styles.group}>
          {members.map((v) => (
            <li
              class={{
                [styles.marjor]: v.marjor,
                [v.className]: !!v.className,
              }}
            >
              <div class={styles.tx}>
                <img src={v.icon} class={styles.txImg} />
                {v.marjor ? <img src={TxBgImg} class={styles.txBg} /> : null}
              </div>
              <div class={styles.name}>{v.name}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  },
};
