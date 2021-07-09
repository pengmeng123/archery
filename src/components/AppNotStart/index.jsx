import styles from "./index.module.less";
import { mapGetters } from "vuex";
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
  mounted() {},
  computed: {
    ...mapGetters(["isGameBettingTime"]),
  },
  watch: {
    endSecond: {
      handler(newVal) {
        console.log("n---", newVal);
        console.log(this.isGameBettingTime);
        if (!this.isGameBettingTime) {
          this.runCount(newVal);
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
        this.$emit("close");
        this.second = 0;
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
