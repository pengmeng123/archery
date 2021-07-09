import styles from "./index.module.less";
import TTPlayerImg from "@/assets/images/tt-player.png";
import CCPlayerImg from "@/assets/images/cc-player.png";
import TtVictoryCardImg from "../../../static/tt-victory-card.png";
import apertureImg from "../../../static/aperture.png";
import TtVictoryTextImg from "../../../static/tt-victory-text.png";
import { mapState } from "vuex";
import { DIRECTION_STR } from "@/config/common";
import _ from "lodash";
export default {
  name: "Archery",
  data() {
    return {
      direction: 1,
      ringNumber: 3,
    };
  },
  computed: {
    ...mapState(["times", "animationStep"]),
    flyClassName() {
      const d = DIRECTION_STR[this.direction]; //选用哪个方向的图片
      const { times } = this;
      return times === 0
        ? `ttFly${_.capitalize(d)}`
        : `ccFly${_.capitalize(d)}`;
    },
    ringNumberClassName() {
      const d = DIRECTION_STR[this.direction]; //选用哪个方向的图片
      return `${d}${this.ringNumber}`;
    },
  },
  render() {
    const { animationStep, times, flyClassName, ringNumberClassName } = this;
    return (
      <div class={styles.container}>
        {/* 开始发放图片 */}
        <div
          class={{
            playerPhoto: true,
            [styles.player]: true,
            [styles.playerAnimation]: animationStep === 1,
          }}
        >
          <img src={TTPlayerImg} alt="" vShow={times === 0} />
          <img src={CCPlayerImg} alt="" vShow={times === 1} />
        </div>
        {/* 拉弓 */}
        <div class={styles.target} vShow={animationStep === 2}>
          <div
            class={{
              [styles.box]: true,
              [styles.ttTargetImg]: times === 0,
              [styles.ccTargetImg]: times === 1,
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
              flyBox: true,
              [styles.box]: true,
              [styles.flyAnimation]: animationStep === 3,
              [styles[flyClassName]]: true,
            }}
          ></div>
        </div>
        {/* 背景图片 */}
        <div
          class={{
            [styles.bg]: true,
            [styles.bgAnimation]: animationStep >= 3 && animationStep < 6,
            homeBg: true,
          }}
        ></div>
        <div
          vShow={animationStep >= 3 && animationStep < 6}
          class={{
            [styles.bgFly]: true,
            [styles.bgAnimation]: animationStep >= 3 && animationStep < 6,
            [styles[flyClassName]]: true,
          }}
        ></div>
        {/* 靶盘 */}
        <div
          class={styles.targetDisk}
          vShow={animationStep >= 4 && animationStep < 6}
        ></div>
        {/* 射中在靶盘上的飞箭 */}
        <div
          class={{
            [styles.flyArrow]: true,
            [styles[ringNumberClassName]]: true,
          }}
          vShow={animationStep >= 4 && animationStep < 6}
        >
          <div
            class={{
              [styles.box]: true,
              [styles.flyArrowAnimation]:
                animationStep >= 4 && animationStep < 6,
            }}
          ></div>
        </div>
        {/* 靶盘闪动 */}
        <div
          class={{
            [styles.rings]: true,
            ringsEle: true,
          }}
          vShow={animationStep >= 4 && animationStep < 6}
        >
          <div
            class={{
              [styles.box]: true,
              [styles.animation]: animationStep >= 4 && animationStep < 6,
            }}
          ></div>
        </div>
        {/* 最后比赛结果 */}
        <div class={styles.matchResultContainer} vShow={animationStep === 5}>
          <div class={styles.matchResult}>
            <img src={apertureImg} alt="" class={styles.apertureImg} />
            <img src={TtVictoryCardImg} alt="" class={styles.cardImg} />
            <img
              src={TtVictoryTextImg}
              class={{
                [styles.text]: true,
                matchResultText: true,
              }}
            />
          </div>
        </div>
      </div>
    );
  },
};
