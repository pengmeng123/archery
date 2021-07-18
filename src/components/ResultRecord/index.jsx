import styles from "./index.module.less";
import iconTagging from "@/assets/images/icon-tagging.png";
import FareTaskText from "@/assets/images/fare-task-text.png";
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
  render() {
    const { data } = this;
    return (
      <div class={styles.container}>
        <img src={FareTaskText} alt="" class={styles.title} />
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
                  {v.result === 1 ? <img src={iconTagging} alt="" /> : null}
                </div>
                <div class={styles.item}>
                  {v.result === 2 ? <img src={iconTagging} alt="" /> : null}
                </div>
                <div class={styles.item}>
                  {v.result === 3 ? <img src={iconTagging} alt="" /> : null}
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
