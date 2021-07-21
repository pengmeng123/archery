import AppPercent from "../AppPercent";
import CreditCard from "../CreditCard";
import Modal from "@/components/Modal";
import Award from "./award";
import { mapState } from "vuex";
import _ from "lodash";
import styles from "./index.module.less";

export default {
  name: "FareTask",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVisible: false,
      currentRecord: {},
    };
  },
  computed: {
    ...mapState(["mainInfo"]),
    data() {
      return _.get(this.mainInfo, "tasklist") || [];
    },
  },
  watch: {
    visible(newVal) {
      console.log("9--dd");
      if (newVal) {
        console.log("9--");
      }
    },
  },
  methods: {
    onReceive() {
      this.isVisible = true;
    },
    onOpenTask(v) {
      this.currentRecord = v;
      this.$service.user
        .acquireTaskOrExchange({
          aid: v.taskId,
          isDanger: true,
          type: v.type,
        })
        .then(() => {
          this.actionTips(v.status);
        });
    },
    onClose() {
      this.$emit("close");
    },
    actionTips(status) {
      switch (status) {
        case -1:
          this.$toast("开启成功");
          break;
        case 0:
          this.isVisible = true;
          break;
        case 1:
          break;
      }
      this.$emit("refresh");
    },
  },
  render() {
    return (
      <div>
        <div class={styles.container}>
          <ul>
            {this.data.map((v) => (
              <li>
                <div class={styles.itemContent}>
                  <div class={styles.title}>{v.title}</div>
                  <div class={styles.desc}>
                    <AppPercent receive={v.finish} total={v.target} />
                  </div>
                </div>
                <div class={styles.award}>
                  <CreditCard task={true} type={v.type} amount={v.amount} />
                </div>
                {v.status === -1 ? (
                  <a
                    href="javascript:"
                    class={{
                      [styles.btn]: true,
                      [styles.btnToFinish]: true,
                    }}
                    onClick={() => {
                      this.onOpenTask(v);
                    }}
                  >
                    开启
                  </a>
                ) : null}
                {v.status === 0 ? (
                  <a
                    href="javascript:"
                    class={{
                      [styles.btn]: true,
                      [styles.btnToFinish]: true,
                    }}
                    onClick={this.onClose}
                  >
                    去完成
                  </a>
                ) : null}
                {v.status === 1 ? (
                  <a
                    href="javascript:"
                    class={{
                      [styles.btn]: true,
                      [styles.btnToReceive]: true,
                    }}
                    onClick={() => {
                      this.onOpenTask(v);
                    }}
                  >
                    领取
                  </a>
                ) : null}
                {v.status === 2 ? (
                  <a
                    href="javascript:"
                    class={{
                      [styles.btn]: true,
                      [styles.btnComplete]: true,
                    }}
                  >
                    已完成
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <Modal className="award" v-model={this.isVisible}>
          <Award record={this.currentRecord} />
        </Modal>
      </div>
    );
  },
};
