import styles from "./index.module.less";
import IconTongtong from "./images/icon-tongtong.png";
import IconChengcheng from "./images/icon-chengcheng.png";
import IconDrawer from "./images/icon-drawer.png";
import { mapGetters, mapState } from "vuex";
import CountDownMixin from "@/mixins/countDownMixin";
import _ from "lodash";
const PhotoObj = {
  1: IconTongtong,
  2: IconChengcheng,
  3: IconDrawer,
};
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
    ...mapState(["startMatch", "gameInfo"]),
    ...mapGetters(["count"]),
    getHistoryGameList() {
      return (_.get(this.gameInfo, "historyGameList") || [])
        .map((v) => v.result)
        .slice(0.8);
    },
  },
  render() {
    const { count } = this;
    const players1 = this.getHistoryGameList.slice(0, 4);
    const players2 = this.getHistoryGameList.slice(4, 8);
    console.log(players1, players2);
    return (
      <div class={styles.container}>
        <div class={styles.header}>
          <div class={styles.players}>
            <ul>
              {players1.map((v) => (
                <li>
                  <img src={PhotoObj[v]} />
                </li>
              ))}
            </ul>
          </div>
          <div class={styles.countDown}>{count}</div>
          <div class={styles.players}>
            <ul>
              {players2.map((v) => (
                <li>
                  <img src={PhotoObj[v]} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  },
};
