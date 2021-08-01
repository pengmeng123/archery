import styles from "./index.module.less";
import { mapState } from "vuex";
import _ from "lodash";
export default {
  name: "ResultRecord",
  data() {
    return {
      data: [
        {
          index: "001",
          result: 1,
        },
        {
          index: "002",
          result: 3,
        },
        {
          index: "003",
          result: 2,
        },
        {
          index: "004",
          result: 1,
        },
        {
          index: "005",
          result: 3,
        },
        {
          index: "006",
          result: 1,
        },
        {
          index: "007",
          result: 3,
        },
        {
          index: "008",
          result: 1,
        },
        {
          index: "009",
          result: 3,
        },
      ],
    };
  },
  computed: {
    ...mapState(["gameInfo"]),
    historyGameList() {
      return _.get(this.gameInfo, "historyGameList") || [];
    },
  },
  render() {
    // const { data } = this;
    const data = this.historyGameList;
    return (
      <div class={styles.container}>
        <img
          src="https://file.40017.cn/huochepiao/activity/arrowtest/static/fare-task-text.png"
          alt=""
          class={styles.title}
        />
        <ul class={styles.nav}>
          <li>期数</li>
          <li>同同胜</li>
          <li>程程胜</li>
          <li>平局</li>
        </ul>
        {data.length ? (
          <ul class={styles.list}>
            {data.map((v) => (
              <li class={styles.listItem}>
                <div class={styles.item}>{v.index}</div>
                <div class={styles.item}>
                  {v.result === 1 ? (
                    <img
                      src="https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-tagging.png"
                      alt=""
                    />
                  ) : null}
                </div>
                <div class={styles.item}>
                  {v.result === 2 ? (
                    <img
                      src="https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-tagging.png"
                      alt=""
                    />
                  ) : null}
                </div>
                <div class={styles.item}>
                  {v.result === 3 ? (
                    <img
                      src="https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-tagging.png"
                      alt=""
                    />
                  ) : null}
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
