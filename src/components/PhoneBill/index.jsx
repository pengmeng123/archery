import styles from "./index.module.less";
import { phoneReg } from "@/utils/validate";
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
      flag: 1,
      loading: false,
    };
  },
  watch: {
    visible(newVal) {
      if (!newVal) {
        this.flag = 1;
      }
    },
  },
  methods: {
    onClear() {
      this.phone = undefined;
    },
    close() {
      this.$emit("close");
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
      this.loading = true;
      this.$service.user
        .goldExchange({
          aid,
          type: record.type,
          phone: this.phone,
        })
        .then((r) => {
          if (_.get(r, "data.code") === 1000) {
            this.flag = 3;
          } else {
            this.$toast(_.get(r, "data.message"));
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  render() {
    return (
      <div class={styles.container}>
        {this.flag === 3 ? (
          <img
            src="https://file.40017.cn/huochepiao/activity/arrowtest/static/recharged.png"
            alt=""
            class={styles.title}
          />
        ) : (
          <img
            src="https://file.40017.cn/huochepiao/activity/arrowtest/static/phone-bill-text.png"
            alt=""
            class={styles.title}
          />
        )}
        {this.flag === 1 ? (
          <div class={styles.content}>
            <div class={styles.inputContainer}>
              <input
                class={styles.input}
                placeholder="请输入手机号"
                type="tel"
                v-model={this.phone}
              />
              {this.phone ? (
                <img
                  src="https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-delete.png"
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
                if (!phoneReg.test(this.phone)) {
                  this.$toast("手机号码有误，请重填");
                  return;
                }
                this.flag = 2;
              }}
            >
              充值
            </a>
          </div>
        ) : null}

        {this.flag === 2 ? (
          <div class={styles.content}>
            <div class={styles.inputContainer}>
              <input
                style={{
                  textAlign: "center",
                  textIndent: "0px",
                }}
                class={styles.input}
                placeholder="请输入手机号"
                type="tel"
                v-model={this.phone}
                readOnly
              />
            </div>
            <div class={styles.btnContainer}>
              <a
                href="javascript:"
                class={{
                  [styles.btnCancel]: true,
                }}
                onClick={() => {
                  this.close();
                }}
              >
                取消
              </a>
              <a
                href="javascript:"
                class={{
                  [styles.btnConfirm]: true,
                }}
                onClick={() => {
                  if (this.phone && !this.loading) {
                    this.onSubmit();
                  }
                }}
              >
                确认
              </a>
            </div>
          </div>
        ) : null}

        {this.flag === 3 ? (
          <div class={styles.recharged}>
            <img
              src="https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-recharged.png"
              alt=""
              class={styles.iconCharged}
            />
            <div class={styles.label}>充值手机号：</div>
            <div class={styles.text}>{this.phone}</div>
          </div>
        ) : null}
      </div>
    );
  },
};
