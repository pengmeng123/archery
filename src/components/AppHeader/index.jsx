import styles from "./index.module.less";
import IconTongtong from "./images/icon-tongtong.png";
import IconChengcheng from "./images/icon-chengcheng.png";
import IconDrawer from "./images/icon-drawer.png";
import { mapGetters, mapState } from "vuex";
import Modal from "@/components/Modal";
import ResultRecord from "../ResultRecord";
import _ from "lodash";
const PhotoObj = {
  1: IconTongtong,
  2: IconChengcheng,
  3: IconDrawer,
};
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
      isResultRecord: false,
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
  methods: {
    onCheckRecord() {
      this.isResultRecord = !this.isResultRecord;
    },
  },
  render() {
    const { count } = this;
    const players1 = this.getHistoryGameList.slice(0, 4);
    const players2 = this.getHistoryGameList.slice(4, 8);
    return (
      <div class={styles.container}>
        <div class={styles.header} onClick={this.onCheckRecord}>
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
        <Modal v-model={this.isResultRecord}>
          <ResultRecord />
        </Modal>
      </div>
    );
  },
};
