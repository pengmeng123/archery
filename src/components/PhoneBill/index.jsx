import styles from "./index.module.less";
import PhoneBillText from "@/assets/images/phone-bill-text.png";
import IconDelete from "@/assets/images/icon-delete.png";
import { phoneReg } from "@/utils/validate";
export default {
  name: "PhoneBill",
  data() {
    return {
      phone: undefined,
    };
  },
  methods: {
    onClear() {
      this.phone = undefined;
    },
    onSubmit() {
      if (!phoneReg.test(this.phone)) {
        this.$toast("手机号码有误，请重填");
        return;
      }
    },
  },
  render() {
    return (
      <div class={styles.container}>
        <img src={PhoneBillText} alt="" class={styles.title} />
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
      </div>
    );
  },
};
