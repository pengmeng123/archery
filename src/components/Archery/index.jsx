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
    ...mapState(["startAnimation", "animationStep"]),
  },
  mounted() {
    this.$nextTick(() => {
      const playerPhoto = document.querySelector(".playerPhoto");
      const targetBox = document.querySelector(".targetBox");
      const homeBg = document.querySelector(".homeBg");
      playerPhoto.addEventListener("webkitAnimationEnd", () => {
        this.setAnimationStep(2);
      });
      targetBox.addEventListener("webkitAnimationEnd", () => {
        this.setAnimationStep(3);
      });
      homeBg.addEventListener("webkitAnimationEnd", () => {
        setTimeout(() => {
          this.setAnimationStep(4);
        }, 100);
      });
    });
  },
  methods: {
    ...mapMutations({
      setAnimation: "SET_STRRT_ANIMATION",
      setBgAnimation: "SET_STRRT_BG_ANIMATION",
      setAnimationStep: "SET_ANIMATION_STEP",
    }),
  },
  render() {
    const { animationStep } = this;
    return (
      <div class={styles.container}>
        <button
          onClick={() => {
            this.setAnimationStep(1);
          }}
          style="position:absolute;z-index:1000"
        >
          click me
        </button>
        <div
          class={{
            playerPhoto: true,
            [styles.player]: true,
            [styles.playerAnimation]: animationStep === 1,
          }}
        >
          <img src={TTPlayerImg} alt="" />
        </div>
        {/* 拉弓 */}
        <div class={styles.target} vShow={animationStep === 2}>
          <div
            class={{
              [styles.box]: true,
              [styles.targetAnimation]: animationStep === 2,
              targetBox: true,
            }}
          ></div>
        </div>

        {/* 箭飞出去 */}
        <div
          class={{
            [styles.fly]: true,
          }}
          vShow={animationStep === 3}
        >
          <div
            ref="flyBoxEle"
            class={{
              [styles.box]: true,
              [styles.flyAnimation]: animationStep === 3,
              flyBox: true,
            }}
          ></div>
        </div>
        {/* 背景图片 */}
        <div
          class={{
            [styles.bg]: true,
            [styles.bgAnimation]: animationStep >= 3,
            homeBg: true,
          }}
        ></div>
        <div
          class={{
            [styles.bgFly]: true,
            [styles.bgAnimation]: animationStep >= 3,
          }}
        ></div>
        {/* 靶盘 */}
        <div class={styles.targetDisk} vShow={animationStep === 4}></div>
        {/* 射中在靶盘上的飞箭 */}
        <div class={styles.flyArrow} vShow={animationStep === 4}>
          <div
            class={{
              [styles.box]: true,
              [styles.flyArrowAnimation]: animationStep === 4,
            }}
          ></div>
        </div>
        <div class={styles.rings} vShow={animationStep === 4}>
          <div
            class={{
              [styles.box]: true,
              [styles.animation]: animationStep === 4,
            }}
          ></div>
        </div>
      </div>
    );
  },
};
