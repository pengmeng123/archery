import styles from "./index.module.less";
export default {
  name: "Prize",
  render() {
    return (
      <div
        class={{
          [styles.container]: true,
        }}
      ></div>
    );
  },
};
