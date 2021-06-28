import styles from "./index.module.less";
import IconTongtong from "./images/icon-tongtong.png";
import IconChengcheng from "./images/icon-chengcheng.png";
import { mapMutations, mapGetters, mapState } from "vuex";
// import { COUNT } from "@/config/common";
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
      timer: null,
    };
  },
  computed: {
    ...mapState(["startMatch"]),
    ...mapGetters(["count"]),
  },
  // watch: {
  //   startMatch: {
  //     handler(newVal) {
  //       if (newVal) {
  //         setTimeout(() => {
  //           this.setStartMatchStatus(false);
  //           this.setCount(COUNT);
  //         }, 5000);
  //       } else {
  //         this.runCount(this.count);
  //       }
  //     },
  //     immediate: true,
  //   },
  // },
  methods: {
    ...mapMutations({
      setStartMatchStatus: "SET_START_MATCH_STATUS",
      setCount: "SET_COUNT",
    }),
    runCount(t) {
      this.timer && clearTimeout(this.timer);
      if (t > 0) {
        this.setCount(t);
        t--;
        this.timer = setTimeout(() => {
          this.runCount(t);
        }, 1000);
      } else {
        this.setCount(0);
        // this.setStartMatchStatus(true);
      }
    },
  },
  render() {
    const { players1, players2, count } = this;
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
          <div class={styles.countDown}>{count}</div>
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
