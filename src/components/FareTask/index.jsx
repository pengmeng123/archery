import AppPercent from "../AppPercent";
import AwardImg from "@/assets/images/award.png";
import styles from "./index.module.less";

export default {
  name: "FareTask",
  data() {
    return {
      data: [
        {
          title: "累计参与10局游戏",
          total: 10,
          receive: 2,
          status: 1,
        },
        {
          title: "累计参与10局游戏",
          total: 10,
          receive: 8,
          status: 1,
        },
        {
          title: "累计参与10局游戏",
          total: 10,
          receive: 2,
          status: 2,
        },
        {
          title: "累计参与10局游戏",
          total: 10,
          receive: 2,
          status: 3,
        },
      ],
    };
  },
  render() {
    return (
      <div class={styles.container}>
        <ul>
          {this.data.map((v) => (
            <li>
              <div class={styles.itemContent}>
                <div class={styles.title}>{v.title}</div>
                <div class={styles.desc}>
                  <AppPercent receive={v.receive} total={v.total} />
                  <img src={AwardImg} class={styles.award} />
                </div>
              </div>
              {v.status === 1 ? (
                <a
                  href="javascript:"
                  class={{
                    [styles.btn]: true,
                    [styles.btnToFinish]: true,
                  }}
                >
                  领取
                </a>
              ) : null}
              {v.status === 2 ? (
                <a
                  href="javascript:"
                  class={{
                    [styles.btn]: true,
                    [styles.btnToReceive]: true,
                  }}
                >
                  去完成
                </a>
              ) : null}
              {v.status === 3 ? (
                <a
                  href="javascript:"
                  class={{
                    [styles.btn]: true,
                    [styles.btnComplete]: true,
                  }}
                >
                  已完成
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  },
};
