import styles from "./index.module.less";
import PhoneBillText from "@/assets/images/phone-bill-text.png";
import IconDelete from "@/assets/images/icon-delete.png";
import { phoneReg } from "@/utils/validate";
import RechargedText from "@/assets/images/recharged.png";
import IconRecharged from "@/assets/images/icon-recharged.png";
import _ from "lodash";
export default {
  name: "PhoneBill",
  props: {
    visible: {
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
      phone: undefined,
      isSuccess: false,
    };
  },
  watch: {
    visible(newVal) {
      if (!newVal) {
        this.isSuccess = false;
      }
    },
  },
  methods: {
    onClear() {
      this.phone = undefined;
    },
    onSubmit() {
      const { record } = this;
      if (!phoneReg.test(this.phone)) {
        this.$toast("手机号码有误，请重填");
        return;
      }
      const aid = record.id;
      if (!aid) {
        return;
      }
      this.$service.user
        .goldExchange({
          aid,
          type: record.type,
          phone: this.phone,
        })
        .then((r) => {
          if (_.get(r, "data.code") === 1000) {
            this.isSuccess = true;
          } else {
            this.$toast(_.get(r, "data.message"));
          }
        });
    },
  },
  render() {
    return (
      <div class={styles.container}>
        {this.isSuccess ? (
          <img src={RechargedText} alt="" class={styles.title} />
        ) : (
          <img src={PhoneBillText} alt="" class={styles.title} />
        )}
        {!this.isSuccess ? (
          <div class={styles.content}>
            <div class={styles.inputContainer}>
              <input type="text" v-model={this.phone} />
              {this.phone ? (
                <img
                  src={IconDelete}
                  alt=""
                  class={styles.close}
                  onClick={this.onClear}
                />
              ) : null}
            </div>
            <a
              href="javascript:"
              class={{
                [styles.btn]: true,
                [styles.btnLight]: !!this.phone,
              }}
              onClick={() => {
                if (this.phone) {
                  this.onSubmit();
                }
              }}
            >
              充值
            </a>
          </div>
        ) : (
          <div class={styles.recharged}>
            <img src={IconRecharged} alt="" class={styles.iconCharged} />
            <div class={styles.label}>充值手机号：</div>
            <div class={styles.text}>{this.phone}</div>
          </div>
        )}
      </div>
    );
  },
};
