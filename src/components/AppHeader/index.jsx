import styles from "./index.module.less";
import { mapGetters, mapState } from "vuex";
import Modal from "@/components/Modal";
import ResultRecord from "../ResultRecord";
import _ from "lodash";
const PhotoObj = {
  1: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-tongtong.png",
  2: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-chengcheng.png",
  3: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-drawer.png",
};
export default {
  name: "AppHeader",
  data() {
    return {
      timer: null,
      isResultRecord: false,
    };
  },
  computed: {
    ...mapState(["startMatch", "gameInfo"]),
    ...mapGetters(["count"]),
    getHistoryGameList() {
      const arr = (_.get(this.gameInfo, "historyGameList") || [])
        .map((v) => v.result)
        .slice(0.8);
      return _.reverse(arr);
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
          <div
            class={{
              [styles.players]: true,
              [styles.playersLeft]: true,
            }}
          >
            <ul>
              {players1.map((v) => (
                <li>
                  <img src={PhotoObj[v]} />
                </li>
              ))}
            </ul>
          </div>
          <div
            class={{
              [styles.countDown]: true,
              // [styles.countDownAnimation]: true,
            }}
          >
            {count < 0 ? 0 : count}
          </div>
          <div
            class={{
              [styles.players]: true,
              [styles.playersRight]: true,
            }}
          >
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
