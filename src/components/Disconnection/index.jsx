import disconnectionImg from "@/assets/images/disconnection.png";
import styles from "./index.module.less";
export default {
  name: "Disconnection",
  methods: {
    onRefresh() {
      this.$router.go(-1); //返回之前点击的页面
    },
  },
  render() {
    return (
      <div class={styles.container}>
        <img class={styles.icon} src={disconnectionImg} alt="" />
        <div class={styles.title}>十分抱歉，网络已断开...</div>
        <a href="javascript:" class={styles.btn} onClick={this.onRefresh}>
          点我刷新
        </a>
      </div>
    );
  },
};
