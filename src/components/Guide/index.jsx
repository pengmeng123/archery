import styles from "./index.module.less";
import step1BgImg from "@/assets/images/guide/step1-bg.png";
import handleBottomImg from "@/assets/images/guide/hand-bottom.png";
import bettingTextImg from "@/assets/images/guide/betting-text.png";
import step5BgImg from "@/assets/images/guide/step5-bg.png";
import handTopImg from "@/assets/images/guide/hand-top.png";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Guide",
  data() {
    return {};
  },
  computed: {
    ...mapState(["guideStep"]),
  },
  methods: {
    ...mapMutations({
      setGuideStep: "SET_GUIDE_STEP",
    }),
    goStep(step) {
      this.setGuideStep(step);
    },
    goPlay() {
      this.setGuideStep(0);
      this.$emit("goAttemptPlay");
    },
  },
  render() {
    const { guideStep } = this;
    return (
      <div class={styles.container}>
        {guideStep === 1 ? (
          <div class={styles.mask}>
            <div class={styles.step1}>
              <img src={step1BgImg} alt="" />
              <a
                class={styles.btnStep}
                onClick={() => {
                  this.goStep(2);
                }}
              ></a>
            </div>
          </div>
        ) : null}
        {guideStep === 2 ? (
          <div class={styles.mask}>
            <div class={styles.step2}>
              <img src={handleBottomImg} alt="" class={styles.handBottom} />
              <a
                class={styles.btnSelect}
                onClick={() => {
                  this.goStep(3);
                }}
              ></a>
            </div>
          </div>
        ) : null}
        {guideStep === 3 ? (
          <div class={styles.mask}>
            <div class={styles.step3}>
              <img class={styles.bettingTextImg} src={bettingTextImg} alt="" />
              <img src={handTopImg} alt="" class={styles.handTopImg} />
              <a
                class={styles.btnSelect}
                onClick={() => {
                  this.goStep(4);
                }}
              ></a>
            </div>
          </div>
        ) : null}
        {guideStep === 4 ? (
          <div class={styles.mask}>
            <div class={styles.step4}>
              <a class={styles.btnConfirm} onClick={this.goPlay}></a>
            </div>
          </div>
        ) : null}
        {guideStep === 5 ? (
          <div class={styles.step5}>
            <img class={styles.step5BgImg} src={step5BgImg} alt="" />
            <a
              class={styles.btnSelect}
              onClick={() => {
                this.goStep(-1);
                this.$router.push({
                  name: "Exchange",
                });
              }}
            ></a>
          </div>
        ) : null}
      </div>
    );
  },
};
