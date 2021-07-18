import Empty from "@/components/Empty";
import { mapState } from "vuex";
import _ from "lodash";
import { GAME_NAME } from "@/config/common";
import styles from "./index.module.less";
import SupportTextImg from "@/assets/images/support-text.png";

export default {
  name: "SupportRecord",
  data() {
    return {
      // data: [
      //   {
      //     date: "2021/05/05",
      //     spNumber: 100,
      //     projectName: "同同获胜",
      //     awardName: "200元代金劵",
      //   },
      // ],
    };
  },
  computed: {
    ...mapState(["mainInfo"]),
    data() {
      return _.get(this.mainInfo, "recordList") || [];
    },
  },
  render() {
    const { data } = this;
    return (
      <div class={styles.container}>
        <img src={SupportTextImg} alt="" class={styles.title} />
        <ul class={styles.nav}>
          <li>时间</li>
          <li>支持</li>
          <li>项目</li>
          <li>奖励</li>
        </ul>
        {data.length ? (
          <ul class={styles.list}>
            {data.map((v) => (
              <li class={styles.listItem}>
                <div class={styles.item}>{v.createTime}</div>
                <div class={styles.item}>{v.spend}</div>
                <div class={styles.item}>{GAME_NAME[v.result]}</div>
                <div class={styles.item}>
                  <div class={styles.awardName}>{v.reward}</div>
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
