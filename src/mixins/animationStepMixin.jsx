import { mapState, mapMutations } from "vuex";
const animationStepMixin = {
  data() {
    return {
      animationFlag: false,
    };
  },
  computed: {
    ...mapState(["animationStep", "times"]),
  },
  methods: {
    ...mapMutations({
      setAnimationStep: "SET_ANIMATION_STEP",
      setTimes: "SET_TIMES",
      setStartMatchStatus: "SET_START_MATCH_STATUS",
      setCount: "SET_COUNT",
    }),
    startMonitorAnimation() {
      if (this.animationFlag) {
        return;
      }
      this.$nextTick(() => {
        const playerPhoto = document.querySelector(".playerPhoto");
        const targetBox = document.querySelector(".targetBox");
        const homeBg = document.querySelector(".homeBg");
        const ringsEle = document.querySelector(".ringsEle");
        const matchResultText = document.querySelector(".matchResultText");
        playerPhoto.addEventListener("webkitAnimationEnd", () => {
          this.setAnimationStep(2);
        });
        targetBox.addEventListener("webkitAnimationEnd", () => {
          this.setAnimationStep(3);
        });
        homeBg.addEventListener("webkitAnimationEnd", () => {
          // 延迟一点是为了让靶盘曝光出现
          setTimeout(() => {
            this.setAnimationStep(4);
          }, 150);
        });
        ringsEle.addEventListener("webkitAnimationEnd", () => {
          // 准备开始下一局

          if (this.times === 0) {
            // 程程开始射箭
            setTimeout(() => {
              this.setAnimationStep(1);
              this.setTimes(this.times + 1);
            }, 300);
          }
          // 两次动画播放完毕后出中奖结果
          if (this.times === 1) {
            this.setAnimationStep(5);
          }
        });
        // 最后比赛结果部分
        matchResultText.addEventListener("webkitAnimationEnd", () => {
          setTimeout(() => {
            this.setAnimationStep(6);
            this.setStartMatchStatus(false);
            this.setTimes(0);
          }, 500);
        });
        this.animationFlag = true;
      });
    },
  },
};
export default animationStepMixin;
