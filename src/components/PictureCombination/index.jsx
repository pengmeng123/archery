import styles from "./index.module.less";
export default {
  name: "PictureCombination",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  render() {
    return (
      <ul class={styles.container}>
        {this.data.map((v) => (
          <li>
            <img src={v} />
          </li>
        ))}
      </ul>
    );
  },
};
