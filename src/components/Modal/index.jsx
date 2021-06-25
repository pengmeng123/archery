import styles from "./index.module.less";
export default {
  name: "Modal",
  model: {
    prop: "visible",
    event: "visibleChange",
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "record",
    },
  },
  methods: {
    close() {
      this.$emit("visibleChange", false);
    },
  },
  render() {
    const { className } = this;
    if (!this.visible) {
      return null;
    }
    return (
      <div
        class={{
          [styles.container]: true,
        }}
      >
        <div
          class={{
            [styles[className]]: true,
          }}
        >
          {this.$slots.default}
        </div>
        <a class={styles.close} onClick={this.close}></a>
      </div>
    );
  },
};
