import styles from "./index.module.less";
import step1BgImg from "@/assets/images/guide/step1-bg.png";
import handleBottomImg from "@/assets/images/guide/hand-bottom.png";
import bettingTextImg from "@/assets/images/guide/betting-text.png";
import step5BgImg from "@/assets/images/guide/step5-bg.png";
export default {
  name: "Guide",
  data() {
    return {
      guideStep: 5,
    };
  },
  render() {
    const { guideStep } = this;
    return (
      <div class={styles.container}>
        {guideStep === 1 ? (
          <div class={styles.mask}>
            <div class={styles.step1}>
              <img src={step1BgImg} alt="" />
              <a class={styles.btnStep}></a>
            </div>
          </div>
        ) : null}
        {guideStep === 2 ? (
          <div class={styles.mask}>
            <div class={styles.step2}>
              <img src={handleBottomImg} alt="" class={styles.handBottom} />
            </div>
          </div>
        ) : null}
        {guideStep === 3 ? (
          <div class={styles.mask}>
            <div class={styles.step3}>
              <img class={styles.bettingTextImg} src={bettingTextImg} alt="" />
            </div>
          </div>
        ) : null}
        {guideStep === 4 ? (
          <div class={styles.mask}>
            <div class={styles.step4}>
              <a class={styles.btnConfirm}></a>
            </div>
          </div>
        ) : null}
        {guideStep === 5 ? (
          <div class={styles.step5}>
            <img class={styles.step5BgImg} src={step5BgImg} alt="" />
          </div>
        ) : null}
      </div>
    );
  },
};
