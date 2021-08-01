import Modal from "@/components/Modal";
import SupportRecord from "@/components/SupportRecord";
import { mapState } from "vuex";
import styles from "./dropdown-more.module.less";
export default {
  name: "DropDownMore",
  data() {
    return {
      visible: false,
      ruleVisible: false,
    };
  },
  watch: {
    startMatch(newVal) {
      if (newVal) {
        this.visible = false;
        this.ruleVisible = false;
      }
    },
  },
  computed: {
    ...mapState(["startMatch"]),
    menus() {
      return [
        {
          title: "活动规则",
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-rule.png",
          func: () => {
            this.ruleVisible = !this.ruleVisible;
          },
        },
        {
          title: "游戏记录",
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-record.png",
          func: () => {
            this.visible = !this.visible;
          },
        },
        {
          title: "客服中心",
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-service.png",
        },
      ];
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  render() {
    const { menus } = this;
    return (
      <div class={styles.container}>
        <div class={styles.dropDownMore}>
          <ul>
            {menus.map((v) => (
              <li
                onClick={() => {
                  v.func && v.func();
                }}
              >
                <img src={v.icon} />
                {v.title}
              </li>
            ))}
          </ul>
        </div>
        {/* 支持记录 */}
        <Modal v-model={this.visible}>
          <SupportRecord />
        </Modal>
        {/* 活动规则 */}
        <Modal className="ruleBg" v-model={this.ruleVisible}>
          <div class={styles.ruleContent}>
            活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则
          </div>
        </Modal>
      </div>
    );
  },
};
