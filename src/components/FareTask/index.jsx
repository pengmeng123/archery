import AppPercent from "../AppPercent";
// import AwardImg from "@/assets/images/award.png";
import Modal from "@/components/Modal";
import Award from "./award";
import { mapState } from "vuex";
import _ from "lodash";
import styles from "./index.module.less";

export default {
  name: "FareTask",
  data() {
    return {
      isVisible: true,
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
                    <img src={v.awardIcon} class={styles.award} />
                  </div>
                </div>
                {v.status === -1 ? (
                  <a
                    href="javascript:"
                    class={{
                      [styles.btn]: true,
                      [styles.btnToFinish]: true,
                    }}
                    onClick={this.onReceive}
                  >
                    领取
                  </a>
                ) : null}
                {v.status === 0 ? (
                  <a
                    href="javascript:"
                    class={{
                      [styles.btn]: true,
                      [styles.btnToReceive]: true,
                    }}
                  >
                    已领取
                  </a>
                ) : null}
                {v.status === 1 ? (
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
          <Award />
        </Modal>
      </div>
    );
  },
};
