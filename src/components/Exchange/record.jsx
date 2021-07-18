import Empty from "@/components/Empty";
import styles from "./record.module.less";
export default {
  name: "ExchangeRecord",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // data: [
      //   {
      //     name: "5元火车票代金券",
      //     date: "2021/05/05 10:10:10",
      //     status: 1,
      //   },
      //   {
      //     name: "5元火车票代金券",
      //     date: "2021/05/05 10:10:10",
      //     status: 1,
      //   },
      // ],
    };
  },
  methods: {
    renderStatus(v) {
      switch (v.status) {
        case 0:
          return "发放中";
        case 1:
          return "发放成功";
        case 2:
          return "发放失败";
      }
    },
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
                <div class={styles.item}>{v.title}</div>
                <div class={styles.item}>{v.createTime}</div>
                <div class={styles.item}>
                  {/* <a href="javascript:" class={styles.btnCheck}>
                    去查看
                  </a> */}
                  <a>{this.renderStatus(v)}</a>
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
