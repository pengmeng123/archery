import ExchangeTextImg from "@/assets/images/exchange-text.png";
import AwardTitle from "@/assets/images/award-title.png";
import CryFaceImg from "@/assets/images/cry-face.png";
import CoinsInsufficientTextImg from "@/assets/images/coins-insufficient-text.png";
import CreditCard from "@/components/CreditCard";
import styles from "./modal.module.less";
import _ from "lodash";
export default {
  name: "ExchangeModal",
  props: {
    goldNotEnough: {
      type: Boolean,
      default: false,
    },
    record: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isSuccess: false,
    };
  },
  methods: {
    onSubmit() {
      const { record } = this;
      const aid = record.id;
      if (!aid) {
        return;
      }
      this.$service.user
        .goldExchange({
          aid,
          type: record.type,
        })
        .then((r) => {
          if (_.get(r, "data.code") === 1000) {
            this.isSuccess = true;
          } else {
            this.$toast(_.get(r, "data.message"));
          }
        });
    },
    onClose() {
      this.$emit("close");
    },
    renderText() {
      return (
        <div class={styles.exchangeModal}>
          <img src={CoinsInsufficientTextImg} alt="" class={styles.title} />
          <img src={CryFaceImg} alt="" class={styles.cryFace} />
          <div class={styles.desc}>快去玩游戏赢取金币吧！</div>
          <div class={styles.btnCheck} onClick={this.goHome}>
            赚金币
          </div>
        </div>
      );
    },
    goHome() {
      this.$emit("close");
      this.$router.push("/");
    },
    onCheck() {
      this.$emit("close");
      this.$emit("checkRecord");
    },
  },
  render() {
    const { record } = this;
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
        <CreditCard type={record.type} amount={record.amount} />
        <div class={styles.desc}>{_.get(record, "title")}</div>
        {this.isSuccess ? (
          <div class={styles.btnCheck} onClick={this.onCheck}>
            去查看
          </div>
        ) : (
          <div class={styles.btnContainer}>
            <a
              href="javascript:"
              class={{
                [styles.btn]: true,
                [styles.btnCancel]: true,
              }}
              onClick={this.onClose}
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
