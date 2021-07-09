import Empty from "@/components/Empty";
import styles from "./index.module.less";

export default {
  name: "SupportRecord",
  data() {
    return {
      data: [
        {
          date: "2021/05/05",
          spNumber: 100,
          projectName: "同同获胜",
          awardName: "200元代金劵",
        },
        {
          date: "2021/05/05",
          spNumber: 100,
          projectName: "同同获胜",
          awardName: "200元代金劵",
        },
        {
          date: "2021/05/05",
          spNumber: 100,
          projectName: "同同获胜",
          awardName: "200元代金劵",
        },
        {
          date: "2021/05/05",
          spNumber: 100,
          projectName: "同同获胜",
          awardName: "200元代金劵",
        },
        {
          date: "2021/05/05",
          spNumber: 100,
          projectName: "同同获胜",
          awardName: "200元代金劵",
        },
        {
          date: "2021/05/05",
          spNumber: 100,
          projectName: "同同获胜",
          awardName: "200元代金劵",
        },
        {
          date: "2021/05/05",
          spNumber: 100,
          projectName: "同同获胜",
          awardName: "200元代金劵",
        },
        {
          date: "2021/05/05",
          spNumber: 100,
          projectName: "同同获胜",
          awardName: "200元代金劵",
        },
        {
          date: "2021/05/05",
          spNumber: 100,
          projectName: "同同获胜",
          awardName: "200元代金劵",
        },
      ],
    };
  },
  render() {
    const { data } = this;
    return (
      <div class={styles.container}>
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
                <div class={styles.item}>{v.date}</div>
                <div class={styles.item}>{v.spNumber}</div>
                <div class={styles.item}>{v.projectName}</div>
                <div class={styles.item}>
                  <div class={styles.awardName}>{v.awardName}</div>
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
