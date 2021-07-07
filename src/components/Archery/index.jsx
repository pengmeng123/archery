import styles from "./index.module.less";
import TTPlayerImg from "@/assets/images/tt-player.png";
import CCPlayerImg from "@/assets/images/cc-player.png";
import TtVictoryCardImg from "../../../static/tt-victory-card.png";
import apertureImg from "../../../static/aperture.png";
import TtVictoryTextImg from "../../../static/tt-victory-text.png";
// tt-fly的四个方向
import TTFlyLeftImg from "@/assets/images/tt/fly-left.png";
import TTFlyRightImg from "@/assets/images/tt/fly-right.png";
// cc-fly的四个方向
import CCFlyLeftImg from "@/assets/images/cc/fly-left.png";
import CCFlyRightImg from "@/assets/images/cc/fly-right.png";
import { DIRECTION_STR } from "@/config/common";
import { mapState } from "vuex";

const flyObj = {
  tt: {
    left: TTFlyLeftImg,
    right: TTFlyRightImg,
  },
  cc: {
    left: CCFlyLeftImg,
    right: CCFlyRightImg,
  },
};
export default {
  name: "Archery",
  data() {
    return {
      direction: 1,
    };
  },
  mounted() {
    // this.init();
  },
  computed: {
    ...mapState(["times", "animationStep"]),
    flySrc() {
      const d = DIRECTION_STR[this.direction]; //选用哪个方向的图片
      const { times } = this;
      return times === 1 ? flyObj.tt[d] : flyObj.cc[d];
    },
  },

  render() {
    const { animationStep, times, direction, flySrc } = this;
    console.log(DIRECTION_STR, direction);
    return (
      <div class={styles.container}>
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

        {/* 
          箭飞出去
          两人分别都有四个方向上下左右
        */}
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
            style={{
              background: `url(${flySrc}) no-repeat center top`,
              backgroundSize: "100% 100%",
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
          class={{
            [styles.bgFly]: true,
            [styles.bgAnimation]: animationStep >= 3 && animationStep < 6,
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
            [styles.left10]: false,
            [styles.left9]: true,
            [styles.left8]: false,
            [styles.left7]: false,
            [styles.left6]: false,
            [styles.left5]: false,
            [styles.left4]: false,
            [styles.left3]: false,
            [styles.left2]: false,
            [styles.left1]: false,
            [styles.top10]: false,
            [styles.top9]: false,
            [styles.top8]: false,
            [styles.top7]: false,
            [styles.top6]: false,
            [styles.top5]: false,
            [styles.top4]: false,
            [styles.top3]: false,
            [styles.top2]: false,
            [styles.top1]: false,
            [styles.bottom10]: false,
            [styles.bottom9]: false,
            [styles.bottom8]: false,
            [styles.bottom7]: false,
            [styles.bottom6]: false,
            [styles.bottom5]: false,
            [styles.bottom4]: false,
            [styles.bottom3]: false,
            [styles.bottom2]: false,
            [styles.bottom1]: false,
            [styles.right10]: false,
            [styles.right9]: false,
            [styles.right8]: false,
            [styles.right7]: false,
            [styles.right6]: false,
            [styles.right5]: false,
            [styles.right4]: false,
            [styles.right3]: false,
            [styles.right2]: false,
            [styles.right1]: false,
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
