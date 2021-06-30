import styles from "./index.module.less";
import { mapState, mapMutations } from "vuex";
import TTPlayerImg from "@/assets/images/tt-player.png";
export default {
  name: "Archery",
  data() {
    return {
      target: false,
      fly: false,
    };
  },
  computed: {
    ...mapState(["startAnimation"]),
  },
  mounted() {
    this.$nextTick(() => {
      const playerPhoto = document.querySelector(".playerPhoto");
      const targetBox = document.querySelector(".targetBox");
      const flyBoxEle = document.querySelector(".flyBox");
      playerPhoto.addEventListener("webkitAnimationEnd", () => {
        console.log("end---");
        this.target = true;
        this.setAnimation(false);
      });
      targetBox.addEventListener("webkitAnimationEnd", () => {
        this.target = false;
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
    return (
      <div class={styles.container}>
        <div
          class={{
            playerPhoto: true,
            [styles.player]: true,
            [styles.playerAnimation]: this.startAnimation,
          }}
        >
          <img src={TTPlayerImg} alt="" />
        </div>
        {/* 拉弓 */}
        <div class={styles.target} vShow={this.target}>
          <div
            class={{
              [styles.box]: true,
              [styles.targetAnimation]: this.target,
              targetBox: true,
            }}
          ></div>
        </div>
        <button
          onClick={() => {
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
