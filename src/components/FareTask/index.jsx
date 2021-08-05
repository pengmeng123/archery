import AppPercent from "../AppPercent";
import CreditCard from "../CreditCard";
import Modal from "@/components/Modal";
import Award from "./award";
import { mapState } from "vuex";
import _ from "lodash";
import Empty from "@/components/Empty";
import styles from "./index.module.less";
const awardNameObj = {
  0: "火车票",
  1: "话费劵",
  2: "国内机票",
  3: "京东卡",
  4: "国内酒店",
};
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
        .then((r) => {
          if (_.get(r, "data.code") === 1000) {
            this.actionTips(v.status);
          } else {
            this.$toast(_.get(r, "data.message"));
          }
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
          break;
        case 1:
          this.isVisible = true;
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
                  <div class={styles.award}>
                    <span class={styles.text}>
                      奖励:{v.amount}元{awardNameObj[v.type]}满减券
                    </span>
                    <div class={styles.icon}>
                      <CreditCard task={true} type={v.type} amount={v.amount} />
                    </div>
                  </div>
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
          {!this.data.length ? (
            <div
              style={{
                paddingTop: "60px",
              }}
            >
              <Empty />
            </div>
          ) : null}
        </div>
        <Modal className="award" v-model={this.isVisible}>
          <Award
            record={this.currentRecord}
            onClose={() => {
              this.isVisible = false;
            }}
          />
        </Modal>
      </div>
    );
  },
};
