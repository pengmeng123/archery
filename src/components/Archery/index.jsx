import styles from "./index.module.less";
import { mapState, mapGetters } from "vuex";
import { DIRECTION_STR } from "@/config/common";
import _ from "lodash";

import PictureCombination from "../PictureCombination";
import { pictureCombinationObj } from "@/config/picture-combination";
export default {
  name: "Archery",
  data() {
    return {};
  },
  computed: {
    ...mapState(["times", "animationStep"]),
    ...mapGetters(["gameResult"]),
    ttDirection() {
      return _.get(this.gameResult, "ttDirection");
    },
    ttRingNumber() {
      return _.get(this.gameResult, "ttRingNumber");
    },
    ccDirection() {
      return _.get(this.gameResult, "ccDirection");
    },
    ccRingNumber() {
      return _.get(this.gameResult, "ccRingNumber");
    },
    gameResultImg() {
      const result = _.get(this.gameResult, "result");
      switch (result) {
        case 2:
          return {
            victoryImg:
              "https://file.40017.cn/huochepiao/activity/arrowtest/static/cc/victory-card.png",
            victoryTextImg:
              "https://file.40017.cn/huochepiao/activity/arrowtest/static/cc/victory-text.png",
          };
        case 3:
          return {
            victoryImg:
              "https://file.40017.cn/huochepiao/activity/arrowtest/static/drawer/victory-card.png",
            victoryTextImg:
              "https://file.40017.cn/huochepiao/activity/arrowtest/static/drawer/victory-text.png",
          };
        default:
          return {
            victoryImg:
              "https://file.40017.cn/huochepiao/activity/arrowtest/static/tt/victory-card.png",
            victoryTextImg:
              "https://file.40017.cn/huochepiao/activity/arrowtest/static/tt/victory-text.png",
          };
      }
    },
    flyClassName() {
      const direction = this.times === 0 ? this.ttDirection : this.ccDirection;
      const d = DIRECTION_STR[direction]; //选用哪个方向的图片
      const { times } = this;
      return times === 0
        ? `ttFly${_.capitalize(d)}`
        : `ccFly${_.capitalize(d)}`;
    },
    ttRingNumberClassName() {
      const d = DIRECTION_STR[this.ttDirection]; //选用哪个方向的图片
      return `${d}${this.ttRingNumber}`;
    },
    ccRingNumberClassName() {
      const d = DIRECTION_STR[this.ccDirection]; //选用哪个方向的图片
      return `${d}${this.ccRingNumber}`;
    },
    ringFlickerClassName() {
      return `ring${this.times === 0 ? this.ttRingNumber : this.ccRingNumber}`;
    },
    awaitResultRingNumber() {
      return this.times === 0 ? this.ttRingNumber : this.ccRingNumber;
    },
  },
  render() {
    const {
      animationStep,
      times,
      flyClassName,
      ringFlickerClassName,
      ttRingNumberClassName,
      ccRingNumberClassName,
      awaitResultRingNumber,
      gameResultImg,
    } = this;
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
          <img
            src="https://file.40017.cn/huochepiao/activity/arrowtest/static/tt/tt-player.png"
            alt=""
            vShow={times === 0}
          />
          <img
            src="https://file.40017.cn/huochepiao/activity/arrowtest/static/cc/cc-player.png"
            alt=""
            vShow={times === 1}
          />
        </div>
        {/* 拉弓 */}
        <div class={styles.target} vShow={animationStep === 2}>
          <div
            class={{
              [styles.box]: true,
              [styles.targetAnimation]: animationStep === 2,
              targetBox: true,
            }}
          >
            {times === 0 ? (
              <ul>
                <li>
                  <img
                    src="https://file.40017.cn/huochepiao/activity/arrowtest/static/tt/target/target1.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://file.40017.cn/huochepiao/activity/arrowtest/static/tt/target/target2.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://file.40017.cn/huochepiao/activity/arrowtest/static/tt/target/target3.png"
                    alt=""
                  />
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <img
                    src="https://file.40017.cn/huochepiao/activity/arrowtest/static/cc/target/target1.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://file.40017.cn/huochepiao/activity/arrowtest/static/cc/target/target2.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://file.40017.cn/huochepiao/activity/arrowtest/static/cc/target/target3.png"
                    alt=""
                  />
                </li>
              </ul>
            )}
          </div>
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
            }}
          >
            <PictureCombination data={pictureCombinationObj[flyClassName]} />
          </div>
        </div>
        {/* 背景图片 */}
        <div
          class={{
            [styles.bg]: true,
            [styles.bgAnimation]: animationStep >= 3 && animationStep < 6,
            homeBg: true,
          }}
        >
          <PictureCombination data={pictureCombinationObj.bg} />
        </div>
        <div
          vShow={animationStep >= 3 && animationStep < 6}
          class={{
            [styles.bgFly]: true,
            [styles.bgAnimation]: animationStep >= 3 && animationStep < 6,
          }}
        >
          <PictureCombination
            data={pictureCombinationObj[`${flyClassName}Bg`]}
          />
        </div>
        {/* 靶盘 */}
        <div
          class={styles.targetDisk}
          vShow={animationStep >= 4 && animationStep < 6}
        ></div>
        {/* 中了几环的提示图片 */}
        <div
          vShow={animationStep === 4}
          class={{
            [styles.ringsCount]: true,
            "animate__animated animate__fadeIn": animationStep === 4,
          }}
        >
          <span>{awaitResultRingNumber}</span>
        </div>
        {/* 射中在靶盘上的飞箭 */}
        <div
          class={{
            [styles.flyArrow]: true,
            [styles[ttRingNumberClassName]]: true,
          }}
          vShow={animationStep >= 4 && animationStep < 6}
        >
          <div
            class={{
              [styles.box]: true,
              [styles.flyArrowAnimation]:
                animationStep >= 4 && animationStep < 6 && times === 0,
              [styles.boxTT]: true,
            }}
          ></div>
        </div>
        <div
          class={{
            [styles.flyArrow]: true,
            [styles[ccRingNumberClassName]]: true,
          }}
          vShow={animationStep >= 4 && animationStep < 6 && times === 1}
        >
          <div
            class={{
              [styles.box]: true,
              [styles.flyArrowAnimation]:
                animationStep >= 4 && animationStep < 6,
              [styles.boxCC]: true,
            }}
          ></div>
        </div>
        {/* 靶盘闪动 */}
        <div
          class={{
            ringsEle: true,
            [styles.rings]: true,
          }}
          vShow={animationStep >= 4 && animationStep < 6}
        >
          <div
            class={{
              [styles.box]: true,
              [styles.animation]: animationStep >= 4 && animationStep < 6,
              [styles[ringFlickerClassName]]: true,
            }}
          ></div>
        </div>
        {/* 最后比赛结果 */}
        <div class={styles.matchResultContainer} vShow={animationStep === 5}>
          <div class={styles.matchResult}>
            <img
              src="https://file.40017.cn/huochepiao/activity/arrowtest/static/aperture.png"
              alt=""
              class={styles.apertureImg}
            />
            <img src={gameResultImg.victoryImg} alt="" class={styles.cardImg} />
            <div
              class={{
                [styles.text]: true,
                [styles.text1]: true,
                [styles.scaleAnimation1]: true,
              }}
            >
              <img src={gameResultImg.victoryTextImg} />
            </div>
            <div
              class={{
                [styles.text]: true,
                [styles.text2]: true,
                [styles.scaleAnimation2]: true,
                matchResultText: true,
              }}
            >
              <img src={gameResultImg.victoryTextImg} />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
