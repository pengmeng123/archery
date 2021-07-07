import styles from "./index.module.less";
import IconTongtong from "./images/icon-tongtong.png";
import IconChengcheng from "./images/icon-chengcheng.png";
import { mapGetters, mapState } from "vuex";
import CountDownMixin from "@/mixins/countDownMixin";
export default {
  name: "AppHeader",
  mixins: [CountDownMixin],
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
