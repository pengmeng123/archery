import styles from "./index.module.less";
export default {
  name: "AppNotStart",
  props: {
    endSecond: {
      type: Number,
    },
  },
  data() {
    return {
      timer: null,
      second: 0,
    };
  },
  watch: {
    endSecond: {
      handler(newVal) {
        if (newVal) {
          this.runCount(newVal + 1);
        } else {
          this.$emit("close");
        }
      },
      immediate: true,
    },
  },
  methods: {
    runCount(t) {
      this.timer && clearTimeout(this.timer);
      if (t > 0) {
        this.second = t;
        t--;
        this.timer = setTimeout(() => {
          this.runCount(t);
        }, 1000);
      } else {
        this.second = 0;
        this.$emit("close");
      }
    },
  },
  render() {
    if (!this.second) {
      return null;
    }
    return (
      <div class={styles.container}>
        <div class={styles.countDown}>
          <div class={styles.box}>请稍后，距离下场还有</div>
          <div class={styles.text}>
            <span class={styles.number}>{this.second}</span>秒
          </div>
        </div>
      </div>
    );
  },
};
