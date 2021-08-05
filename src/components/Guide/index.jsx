import styles from "./index.module.less";
import step1BgImg from "@/assets/images/guide/step1-bg.png";
import handleBottomImg from "@/assets/images/guide/hand-bottom.png";
import bettingTextImg from "@/assets/images/guide/betting-text.png";
import handTopImg from "@/assets/images/guide/hand-top.png";
import selectGoldTextImg from "@/assets/images/guide/select-gold-text.png";
import bettingText1Img from "@/assets/images/guide/betting-text1.png";
import step5TextImg from "@/assets/images/guide/step5-text.png";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Guide",
  data() {
    return {
      timer: null,
      second: 0,
    };
  },
  computed: {
    ...mapState(["guideStep"]),
  },
  methods: {
    ...mapMutations({
      setGuideStep: "SET_GUIDE_STEP",
      setAttemptPlay: "SET_ATTEMPLT_PLAY",
    }),
    runCount(t) {
      this.timer && clearTimeout(this.timer);
      if (t > 0) {
        this.second = t;
        t--;
        this.timer = setTimeout(() => {
          this.runCount(t);
        }, 1000);
      } else {
        this.timer && clearTimeout(this.timer);
        this.second = 0;
        this.goPlay();
      }
    },
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
              <img
                src={selectGoldTextImg}
                alt=""
                class={styles.selectGoldTextImg}
              />
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
              <div class={styles.hand}></div>
              <img
                src={bettingText1Img}
                alt=""
                class={styles.bettingText1Img}
              />
              <a
                class={styles.btnSelect}
                onClick={() => {
                  this.goStep(4);
                  this.runCount(5);
                }}
              ></a>
            </div>
          </div>
        ) : null}

        {guideStep === 4 ? (
          <div class={styles.mask}>
            <div class={styles.countDown}>
              <div class={styles.box}>比赛即将开始</div>
              <div class={styles.text}>
                <span class={styles.number}>{this.second}</span>秒
              </div>
            </div>
          </div>
        ) : null}

        {guideStep === 5 ? (
          <div class={styles.mask}>
            <div class={styles.step4}>
              <a
                class={styles.btnConfirm}
                onClick={() => {
                  this.goStep(6);
                }}
              ></a>
            </div>
          </div>
        ) : null}

        {guideStep === 6 ? (
          <div class={styles.mask}>
            <div class={styles.step5}>
              <img
                src="https://file.40017.cn/huochepiao/activity/arrowtest/static/gold-exchange.png"
                alt=""
                class={styles.icon}
              />
              <div
                onClick={() => {
                  this.goStep(-1);
                  this.setAttemptPlay(false);
                  this.$router.push({
                    name: "Exchange",
                  });
                }}
              >
                <img src={handTopImg} alt="" class={styles.handTopImg} />
                <img src={step5TextImg} alt="" class={styles.step5TextImg} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
