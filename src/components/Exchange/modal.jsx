import ExchangeTextImg from "@/assets/images/exchange-text.png";
import AwardImg from "@/assets/images/award.png";
import AwardTitle from "@/assets/images/award-title.png";
import CryFaceImg from "@/assets/images/cry-face.png";
import CoinsInsufficientTextImg from "@/assets/images/coins-insufficient-text.png";
import styles from "./modal.module.less";
export default {
  name: "ExchangeModal",
  props: {
    goldNotEnough: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSuccess: false,
    };
  },
  methods: {
    onSubmit() {
      this.isSuccess = true;
    },
    renderText() {
      return (
        <div class={styles.exchangeModal}>
          <img src={CoinsInsufficientTextImg} alt="" class={styles.title} />
          <img src={CryFaceImg} alt="" class={styles.cryFace} />
          <div class={styles.desc}>快去玩游戏赢取金币吧！</div>
          <div class={styles.btnCheck}>赚金币</div>
        </div>
      );
    },
  },
  render() {
    if (this.goldNotEnough) {
      return this.renderText();
    }
    return (
      <div class={styles.exchangeModal}>
        {this.isSuccess ? (
          <img src={AwardTitle} alt="" class={styles.title} />
        ) : (
          <img src={ExchangeTextImg} alt="" class={styles.title} />
        )}
        <img src={AwardImg} alt="" class={styles.awardImg} />
        <div class={styles.desc}>10元火车票立减券</div>
        {this.isSuccess ? (
          <div class={styles.btnCheck}>去查看</div>
        ) : (
          <div class={styles.btnContainer}>
            <a
              href="javascript:"
              class={{
                [styles.btn]: true,
                [styles.btnCancel]: true,
              }}
            >
              取消
            </a>
            <a
              href="javascript:"
              class={{
                [styles.btn]: true,
                [styles.btnConfirm]: true,
              }}
              onClick={this.onSubmit}
            >
              确认
            </a>
          </div>
        )}
      </div>
    );
  },
};
