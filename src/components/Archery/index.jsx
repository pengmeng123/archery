import styles from "./index.module.less";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Archery",
  data() {
    return {
      fly: false,
    };
  },
  computed: {
    ...mapState(["startAnimation"]),
  },
  mounted() {
    this.$nextTick(() => {
      const targetBox = document.querySelector(".targetBox");
      const flyBoxEle = document.querySelector(".flyBox");
      targetBox.addEventListener("webkitAnimationEnd", () => {
        // this.target = false;
        this.setAnimation(false);
        this.fly = true;
        this.setBgAnimation(true);
      });
      flyBoxEle.addEventListener("webkitAnimationEnd", () => {
        console.log("end--");
        this.fly = false;
      });
    });
  },
  methods: {
    ...mapMutations({
      setAnimation: "SET_STRRT_ANIMATION",
      setBgAnimation: "SET_STRRT_BG_ANIMATION",
    }),
  },
  render() {
    console.log("8---");
    return (
      <div class={styles.container}>
        {/* 拉弓 */}
        <div class={styles.target} vShow={this.startAnimation}>
          <div
            class={{
              [styles.box]: true,
              [styles.targetAnimation]: this.startAnimation,
              targetBox: true,
            }}
          ></div>
        </div>
        <button
          onClick={() => {
            console.log("fly---");
            this.setAnimation(true);
          }}
        >
          click me
        </button>
        {/* 箭飞出去 */}
        <div
          class={{
            [styles.fly]: true,
          }}
          vShow={this.fly}
        >
          <div
            ref="flyBoxEle"
            class={{
              [styles.box]: true,
              [styles.flyAnimation]: this.fly,
              flyBox: true,
            }}
          ></div>
        </div>
      </div>
    );
  },
};
