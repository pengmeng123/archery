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
    return {};
  },
  methods: {
    renderStatus(v) {
      switch (v.status) {
        case 0:
          return "发放中";
        case 1:
          // return "发放成功";
          return (
            <a
              class={styles.btnCheck}
              onClick={() => {
                this.goCheck(v);
              }}
            >
              去查看
            </a>
          );
        case 2:
          return "发放失败";
      }
    },
    goCheck(v) {
      if (v.id == 2722) {
        if (v.phone) {
          this.$emit("checkPhone", v.phone);
        }
      } else {
        // this.$toast("待跳转劵中心链接");
        window.location.href = "https://wx.17u.cn/pub/MyCard?ifhttps=true";
      }
    },
  },
  render() {
    const { data } = this;
    return (
      <div class={styles.container}>
        <img
          src="https://file.40017.cn/huochepiao/activity/arrowtest/static/duihuan-text.png"
          alt=""
          class={styles.title}
        />
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
