import Empty from "@/components/Empty";
import styles from "./record.module.less";
export default {
  name: "ExchangeRecord",
  data() {
    return {
      data: [
        {
          name: "5元火车票代金券",
          date: "2021/05/05 10:10:10",
          status: 1,
        },
        {
          name: "5元火车票代金券",
          date: "2021/05/05 10:10:10",
          status: 1,
        },
        {
          name: "5元火车票代金券",
          date: "2021/05/05 10:10:10",
          status: 1,
        },
        {
          name: "5元火车票代金券",
          date: "2021/05/05 10:10:10",
          status: 1,
        },
        {
          name: "5元火车票代金券",
          date: "2021/05/05 10:10:10",
          status: 1,
        },
        {
          name: "5元火车票代金券",
          date: "2021/05/05 10:10:10",
          status: 1,
        },
        {
          name: "5元火车票代金券",
          date: "2021/05/05 10:10:10",
          status: 1,
        },
        {
          name: "5元火车票代金券",
          date: "2021/05/05 10:10:10",
          status: 1,
        },
      ],
    };
  },
  render() {
    const { data } = this;
    return (
      <div class={styles.container}>
        <ul class={styles.nav}>
          <li>奖品</li>
          <li>获得时间</li>
          <li>发放状态</li>
        </ul>
        {data.length ? (
          <ul class={styles.list}>
            {data.map((v) => (
              <li class={styles.listItem}>
                <div class={styles.item}>{v.name}</div>
                <div class={styles.item}>{v.date}</div>
                <div class={styles.item}>
                  <a href="javascript:" class={styles.btnCheck}>
                    去查看
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
        {!data.length ? (
          <div
            style={{
              paddingTop: "60px",
            }}
          >
            <Empty />
          </div>
        ) : null}
      </div>
    );
  },
};
